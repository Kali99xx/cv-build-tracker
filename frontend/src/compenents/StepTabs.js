const StepTabs = ({ steps, selectedStep, onSelect }) => {
    return (
      <div className="flex space-x-4 border-b-2 mb-6">
        {steps.map((step, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-lg ${selectedStep === step ? 'font-bold text-blue-500' : 'text-gray-500'}`}
            onClick={() => onSelect(step)}
          >
            {step}
          </button>
        ))}
      </div>
    );
  };
  
  export default StepTabs;
  