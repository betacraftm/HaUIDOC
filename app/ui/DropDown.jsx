import { useState } from "react";

const DropDown = ({ title, list, id, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredList, setFilteredList] = useState(list);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredList(
      list.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setDropdownOpen(true);
  };

  const handleInputSelect = (name) => {
    setInputValue(name);
    setDropdownOpen(false);
  };

  const handleInputFocus = () => {
    setFilteredList(list);
    setDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdownOpen(false), 100);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-base font-semibold text-gray-800"
      >
        {title}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type="text"
          autoComplete="off"
          required
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
          placeholder={placeholder}
        />
        {dropdownOpen && filteredList.length > 0 && (
          <ul className="absolute bottom-full z-10 mb-1 max-h-40 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {filteredList.map((item) => (
              <li
                key={item.id}
                className="hover:bg-primary/10 cursor-pointer px-3 py-1.5 text-sm"
                onMouseDown={() => handleInputSelect(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropDown;
