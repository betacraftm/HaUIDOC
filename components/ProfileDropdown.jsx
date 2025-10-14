import { useEffect, useState } from "react";

const ProfileDropDown = ({
  title,
  list,
  id,
  placeholder,
  value,
  setValue,
  isSubmit,
}) => {
  const [inputValue, setInputValue] = useState(
    list.find((m) => m.id === value)?.name || value || "",
  );
  const [filteredList, setFilteredList] = useState(list);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const found = list.find((m) => m.id === value);
    if (found) setInputValue(found.name);
  }, [value, list]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setFilteredList(
      list.filter((item) =>
        item.name.toLowerCase().includes(val.toLowerCase()),
      ),
    );
    setDropdownOpen(true);
    setValue("");
  };

  const handleInputSelect = (item) => {
    setInputValue(item.name);
    setValue(item.id);
    setDropdownOpen(false);
  };

  const handleInputFocus = () => {
    setFilteredList(list);
    setDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setDropdownOpen(false), 100);
  };

  useEffect(() => {
    if (isSubmit) setDropdownOpen(false);
  }, [isSubmit]);

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
          <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {filteredList.map((item) => (
              <li
                key={item.id}
                className="hover:bg-primary/10 cursor-pointer px-3 py-1.5 text-sm"
                onMouseDown={() => handleInputSelect(item)}
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

export default ProfileDropDown;
