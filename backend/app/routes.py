from flask import Blueprint, jsonify
from flask import request
from flask import Response
from .config import Config
from .models import Steps, Users, Items, Accounts, Account_Users, Techs, Projects
from starlette import status
from .extensions import db, bcrypt, jwt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
import os
from werkzeug.utils import secure_filename

track = Blueprint('track', __name__)

@track.route('/register', methods=['POST'])
def register():
    users = Users.query.all()
    user_names = [user.name for user in users]
    data = request.json
    userID = data.get("userID")
    password = data.get("password")

    if userID in user_names:
        return jsonify({"message": "User ID already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    # users[userID] = {"password": hashed_pw, "role": 1}  # Default role: user

    new_user = Users(name=userID, password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@track.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    userID = data.get("userID")
    password = data.get("password")
    
    user = Users.query.filter(Users.name==userID).first()
    print(user.password)
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user.id), expires_delta=None)
    return jsonify({"access_token": access_token}), 200

@track.route("/load_info/", methods=["Get"])
@jwt_required()  # ✅ Require authentication
def load_title():
    try:
        steps = Steps.query.all() 
        step_names = [step.name for step in steps]
        user_identity = get_jwt_identity()  # ✅ Get current user details
        user = Users.query.filter(Users.id==user_identity).first()
        user_role = user.role
        if user_role == 0:  # Admin
            items = Items.query.all()  # ✅ Admins get all data
        else:  # Regular User
            items = Items.query.filter_by(user_id=user.id).all()  # ✅ Users get only their own data

        grouped_result = []
        for step in step_names:
            # Find items that match the current step
            
            # Find items that match the current step and sort them
            step_items = sorted(
                [
                    {
                        "name": item.account_user.name,
                        "user": item.user.name,
                        "site": item.site.name,
                        "col_idx": item.col_idx,
                        "row_idx": item.row_idx,
                        "company_name": item.company_name,
                        "content": item.content,
                        "job_des": item.job_des,
                        "created_at": item.created_at,
                        "updated_at": item.updated_at,
                        "step_id": item.step_id,
                        "step": step
                    }
                    for item in items if item.step.name == step
                ],
                key=lambda x: (x['col_idx'], x['row_idx'])  # Sort by col_idx first, then row_idx
            )
            
            # Add the grouped items for the current step
            grouped_result.append({'items': step_items})

        accounts = Accounts.query.all() 
        account_types = [account.name for account in accounts]
        if user_role == 0:  # Admin
            account_userfield = Account_Users.query.all()  # ✅ Admins get all data
        else:  # Regular User
            account_userfield = Account_Users.query.filter_by(user_id=user.id).all()  # ✅ Users get only their own data
        account_users = [item.name for item in account_userfield]
        # account_users = Account_Users.query.all()
        print(grouped_result)
        resp_content = {"message": "Request was successful", "steps": step_names, 'items': grouped_result, 'account_types': account_types, 'account_users': account_users }
        # print(resp_content)
        return jsonify(resp_content), status.HTTP_200_OK
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@track.route("/get_account_users/", methods=["POST"])
def get_account_users():
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        items = Account_Users.query.filter_by(user_id=user_id).all()
        account_names = [item.name for item in items]
        # account_users = Account_Users.query.all()
        resp_content = {"message": "Request was successful", "account_names": account_names }
        return jsonify(resp_content), status.HTTP_200_OK
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@track.route("/track/handle_track/", methods=["Post"])
@jwt_required()  # ✅ Require authentication
def handle_track():
    try:
        data = request.get_json()
        type = data.get("type")
        params = data.get("params")
        # print(params)
        user_identity = get_jwt_identity()  # ✅ Get current user details
        user = Users.query.filter(Users.id==user_identity).first()

        if type == "ADD_TRACK":
            temp = {k: v for k, v in params.items() if k != "status"}
            site = Accounts.query.filter(Accounts.name==temp['site']).first()
            account_user = Account_Users.query.filter(Account_Users.name==temp['name'], Account_Users.user_id==user.id).first()
            # max_row_item = Items.query.filter(Items.step_id == 1).order_by(Items.row_idx.desc()).first()
            # max_row = 0
            # if max_row_item:
            #     max_row = max_row_item.max_row + 1
            print(temp)
            new_item = Items(step_id=temp['col_idx'] + 1, row_idx=temp['row_idx'], col_idx=temp['col_idx'], user_id=user.id, content=temp['content'], company_name=temp['company_name'], job_des=temp['job_des'], site_id=site.id, account_user_id=account_user.id)
            db.session.add(new_item)
            db.session.commit()
            db.session.refresh(new_item)

            
            return jsonify({"message": "Data successfully saved", "item":{
                        "name": new_item.account_user.name,
                        "user": new_item.user.name,
                        "site": new_item.site.name,
                        "col_idx": new_item.col_idx,
                        "row_idx": new_item.row_idx,
                        "company_name": new_item.company_name,
                        "content": new_item.content,
                        "job_des": new_item.job_des,
                        "created_at": new_item.created_at,
                        "updated_at": new_item.updated_at,
                        "step_id": new_item.step_id,
                        "step": new_item.step.name
                    }}), 200

        elif type == "UPDATE_TRACK":
            # Update an existing item
            print("UPDATE_TRACK")
            item = Items.query.filter(Items.row_idx==params['row_idx'], Items.col_idx==params['col_idx'], Items.user_id==user.id).first()
            if item:
                print("FOUND_ITEM")
                # Find the step_id based on the 'status' field (step name)
                step = Steps.query.filter(Steps.name==params['status']).first()
                site = Accounts.query.filter(Accounts.name==params['site']).first()
                account_user = Account_Users.query.filter(Account_Users.name==params['name'], Account_Users.user_id==user.id).first()
                # max_row_item = Items.query.filter(Items.step_id == step.id, Items.user_id==user.id).order_by(Items.row_idx.desc()).first()
                # if step:
                #     # Set the step_id if the step exists
                #     item.step_id = step.id
                #     item.col_idx = step.id - 1
                #     if max_row_item:
                #         item.row_idx = max_row_item.row_idx + 1
                #     else:
                #         item.row_idx = 0
                # else:
                #     return jsonify({'message': 'Step not found for the given status'}), 400
                item.job_des=params['job_des']
                item.company_name=params['company_name']
                item.content=params['content']
                item.name_id=account_user.id
                item.site_id=site.id
                db.session.commit()

                steps = Steps.query.all() 
                step_names = [step.name for step in steps]
                items = Items.query.filter(Items.user_id==user.id).all()  # ✅ Users get only their own data
                grouped_result = []
                # Iterate over each step
                for step in step_names:
                    step_items = sorted(
                        [
                            {
                                "name": item.account_user.name,
                                "user": item.user.name,
                                "site": item.site.name,
                                "col_idx": item.col_idx,
                                "row_idx": item.row_idx,
                                "company_name": item.company_name,
                                "content": item.content,
                                "job_des": item.job_des,
                                "created_at": item.created_at,
                                "updated_at": item.updated_at,
                                "step_id": item.step_id,
                                "step": step
                            }
                            for item in items if item.step.name == step
                        ],
                        key=lambda x: (x['col_idx'], x['row_idx'])  # Sort by col_idx first, then row_idx
                    )
                    
                    # Add the grouped items for the current step
                    grouped_result.append({'items': step_items})

                return jsonify({"message": "Data successfully Updated", "item":grouped_result}), 200

        elif type == "DELETE_TRACK":
            # Delete an item
            item = Items.query.filter(Items.row_idx==params['row_idx'], Items.col_idx==params['col_idx'], Items.user_id==user.id).first()
            if item:
                db.session.delete(item)
                Items.query.filter(Items.col_idx==params['col_idx'], Items.row_idx>params['row_idx'], Items.user_id==user.id).update({
                    Items.row_idx: Items.row_idx-1
                })
                db.session.commit()
                print(item.content)
                print(item.account_user_id)
                return jsonify({"message": "Data successfully removed", "item":{
                        "name": Account_Users.query.filter(Account_Users.id==item.account_user_id).first().name,
                        "user": Users.query.filter(Users.id==item.user_id).first().name,
                        "site": Accounts.query.filter(Accounts.id==item.site_id).first().name,
                        "col_idx": item.col_idx,
                        "row_idx": item.row_idx,
                        "company_name": item.company_name,
                        "content": item.content,
                        "job_des": item.job_des,
                        "created_at": item.created_at,
                        "updated_at": item.updated_at,
                        "step_id": item.step_id,
                        "step": Steps.query.filter(Steps.id==item.step_id).first().name,
                    }}), 200
            else:
                return jsonify({"message": "Item not found"}), 404
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@track.route("/track/move/", methods=["POST"])
@jwt_required()  # ✅ Require authentication
def move_track():
    try:
        # Parse input JSON
        data = request.get_json()

        user_identity = get_jwt_identity()  # ✅ Get current user details
        user = Users.query.filter(Users.id==user_identity).first()

        st_col = data[0]
        st_row = data[1]
        end_col = data[2]
        end_row = data[3]

        steps = Steps.query.all() 
        step_names = [step.name for step in steps]
        print("Request Data:", data)

        Items.query.filter(Items.col_idx == end_col, Items.row_idx >= end_row, Items.user_id == user.id).update(
            {Items.row_idx: Items.row_idx + 1}
        )
        Items.query.filter(Items.row_idx==st_row, Items.col_idx==st_col, Items.user_id == user.id).update(
            {Items.row_idx: end_row, Items.col_idx: end_col,
            Items.step_id: end_col + 1}
        )
        Items.query.filter(Items.col_idx == st_col, Items.row_idx > st_row, Items.user_id == user.id).update(
            {Items.row_idx: Items.row_idx - 1}
        )
        db.session.commit()

        return {"message": "Item successfully moved"}, 200
    except KeyError as e:
        return {"message": f"Missing required fields in request: {str(e)}"}, 400
    except Exception as e:
        return {"message": f"An error occurred: {str(e)}"}, 400

@track.route("/track/handle_title/", methods=["Post"])
def handle_title():
    print("--------------------------")
    type = request.form['type']
    title = request.form['title']
    pre_title = request.form['pre_title']
    try:
        if type == "ADD_TITLE":
            new_title = Steps(name=title)
            db.session.add(new_title)
            db.session.commit()
            return {"message": "Title was successfully added", "new": title}, 200
        
        if type == "DELETE_TITLE":
            delete_title = Steps.query.filter(Steps.name==title).first()
            print(delete_title)
            if delete_title:
                db.session.delete(delete_title)
                db.session.commit()
                return {"message": "Title was successfully deleted", "delete": title}, 200
            return {"message": "Title was not found"}, 404
        
        if type == "UPDATE_TITLE":
            update_title = Steps.query.filter(Steps.name==pre_title).first()
            if update_title:
                update_title = title
                db.session.commit()
                return {"message": "Title was successfully updated", "update": title}, 200
            return {"message": "Title was not found"}, 404
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@track.route("/get-tech-info", methods=["Get"])
def getTechInfo():
    info = Techs.query.all()
    techs_list = [
        {
            "id": tech.id,
            "company_name": tech.company_name,
            "company_url": tech.company_url,
            "video_source": tech.video_source,
            "job_role": tech.job_role,
            "job_des": tech.job_des,
        }
        for tech in info
    ]
    return jsonify(techs_list), 200

@track.route("/add-tech-info", methods=["POST"])
@jwt_required()
def addTechInfo():
    print("addTechInfo")
    try:
        print(request)
        # Parse input JSON
        data = request.get_json()
        print(data)
        user_identity = get_jwt_identity()  # ✅ Get current user details
        user = Users.query.filter(Users.id==user_identity).first()
        # Create a new Techs record
        new_tech = Techs(
            company_name=data.get("company_name"),
            company_url=data.get("company_url"),
            video_source=user.name,
            job_role=data.get("job_role"),
            job_des=data.get("job_des"),
        )

        db.session.add(new_tech)  # Add the new record
        db.session.commit()  # Commit changes to the database

        return jsonify({"message": "Tech info added successfully!", "id": new_tech.id}), 201

    except Exception as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({"error": str(e)}), 500

def allowed_file(filename):
    """Check if the file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

@track.route("/upload-project", methods=["POST"])
@jwt_required()
def upload_project():
    """Upload a source code file to begin a new project"""
    try:
        user_identity = get_jwt_identity()
        user = Users.query.filter(Users.id==user_identity).first()
        
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Check if file type is allowed
        if not allowed_file(file.filename):
            return jsonify({"error": "File type not allowed. Please upload a source code file"}), 400
        
        # Get additional form data
        project_name = request.form.get('project_name', '')
        description = request.form.get('description', '')
        
        if not project_name:
            return jsonify({"error": "Project name is required"}), 400
        
        # Secure the filename
        filename = secure_filename(file.filename)
        
        # Create upload folder if it doesn't exist
        upload_folder = Config.UPLOAD_FOLDER
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        
        # Create user-specific folder
        user_folder = os.path.join(upload_folder, str(user.id))
        if not os.path.exists(user_folder):
            os.makedirs(user_folder)
        
        # Save the file
        file_path = os.path.join(user_folder, filename)
        file.save(file_path)
        
        # Get file info
        file_size = os.path.getsize(file_path)
        file_type = filename.rsplit('.', 1)[1].lower() if '.' in filename else ''
        
        # Save project info to database
        new_project = Projects(
            user_id=user.id,
            project_name=project_name,
            file_name=filename,
            file_path=file_path,
            file_type=file_type,
            file_size=file_size,
            description=description
        )
        
        db.session.add(new_project)
        db.session.commit()
        
        return jsonify({
            "message": "Project uploaded successfully!",
            "project": {
                "id": new_project.id,
                "project_name": new_project.project_name,
                "file_name": new_project.file_name,
                "file_type": new_project.file_type,
                "file_size": new_project.file_size,
                "description": new_project.description,
                "created_at": new_project.created_at
            }
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@track.route("/get-projects", methods=["GET"])
@jwt_required()
def get_projects():
    """Get all projects for the current user"""
    try:
        user_identity = get_jwt_identity()
        user = Users.query.filter(Users.id==user_identity).first()
        
        projects = Projects.query.filter_by(user_id=user.id).order_by(Projects.created_at.desc()).all()
        
        projects_list = [
            {
                "id": project.id,
                "project_name": project.project_name,
                "file_name": project.file_name,
                "file_type": project.file_type,
                "file_size": project.file_size,
                "description": project.description,
                "created_at": project.created_at,
                "updated_at": project.updated_at
            }
            for project in projects
        ]
        
        return jsonify({"projects": projects_list}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@track.route("/delete-project/<int:project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    """Delete a project and its associated file"""
    try:
        user_identity = get_jwt_identity()
        user = Users.query.filter(Users.id==user_identity).first()
        
        project = Projects.query.filter_by(id=project_id, user_id=user.id).first()
        
        if not project:
            return jsonify({"error": "Project not found"}), 404
        
        # Delete the file from filesystem
        if os.path.exists(project.file_path):
            os.remove(project.file_path)
        
        # Delete from database
        db.session.delete(project)
        db.session.commit()
        
        return jsonify({"message": "Project deleted successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500