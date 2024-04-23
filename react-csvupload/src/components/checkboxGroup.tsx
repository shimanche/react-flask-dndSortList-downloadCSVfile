import React, { useState } from 'react';
import { Checkbox } from '../atom/checkbox';

interface CheckboxGroupProps {
  selectedGroups: string[];
  onChange: (selectedGroups: string[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ selectedGroups, onChange }) => {
  // const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    if (selectedGroups.includes(value)) {
      onChange(selectedGroups.filter(group => group !== value));
    } else {
      onChange([...selectedGroups, value]);
    }
    // console.log(selectedGroups)
  };


  return (
    <div>
      <Checkbox
        label="Group 1"
        value="group1"
        checked={selectedGroups.includes("group1")}
        onChange={handleCheckboxChange}
      />
      <Checkbox
        label="Group 2"
        value="group2"
        checked={selectedGroups.includes("group2")}
        onChange={handleCheckboxChange}
      />
      <Checkbox
        label="Group 3"
        value="group3"
        checked={selectedGroups.includes("group3")}
        onChange={handleCheckboxChange}
      />
      <Checkbox
        label="Group 4"
        value="group4"
        checked={selectedGroups.includes("group4")}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

// const App: React.FC = () => {
//   return (
//     <div>
//       <h1>Choose Groups</h1>
//       <CheckboxGroup />
//     </div>
//   );
// };

// export default App;