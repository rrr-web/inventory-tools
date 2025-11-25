export const renderInput = (col, editedData, errors, handleInputChange) => {
  const value = editedData[col.key] ?? "";
  const hasError = !!errors[col.key];

  
  const inputClassName = `w-full text-sm ${hasError ? "border-destructive border-2" : "border border-gray-300"} rounded px-2`;
  
  const containerClassName = "space-y-1 min-w-[120px]";

  switch (col.type) {
    case "textarea":
      return (
        <div className={containerClassName}>
          <textarea
            value={value}
            onChange={(e) => handleInputChange(col.key, e.target.value)}
            className={`${inputClassName} min-h-[60px]`}
          />
          {hasError && (
            <p className="text-xs text-destructive">{errors[col.key]}</p>
          )}
        </div>
      );

    case "number":
      return (
        <div className={containerClassName}>
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(col.key, e.target.value)}
            className={`${inputClassName} h-8`}
          />
          {hasError && (
            <p className="text-xs text-destructive">{errors[col.key]}</p>
          )}
        </div>
      );

    case "date":
      return (
        <div className={containerClassName}>
          <input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(col.key, e.target.value)}
            className={`${inputClassName} h-8`}
          />
          {hasError && (
            <p className="text-xs text-destructive">{errors[col.key]}</p>
          )}
        </div>
      );

    case "select":
      return (
        <div className={containerClassName}>
          <select 
            value={value}
            onChange={(e) => handleInputChange(col.key, e.target.value)}
            className={`${inputClassName} h-8`}
          >
            <option value="">Pilih {col.label}</option>
            {col.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {hasError && (
            <p className="text-xs text-destructive">{errors[col.key]}</p>
          )}
        </div>
      );

    default:
      return (
        <div className={containerClassName}>
          <input
            value={value}
            onChange={(e) => handleInputChange(col.key, e.target.value)}
            className={`${inputClassName} h-8`}
          />
          {hasError && (
            <p className="text-xs text-destructive">{errors[col.key]}</p>
          )}
        </div>
      );
  }
};