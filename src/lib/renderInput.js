export const renderInput = (col, editedData, errors, handleInputChange) => {
  const value = editedData[col.key] ?? "";
  const hasError = !!errors[col.key];

  switch (col.type) {
    case "textarea":
      return (
        <div className="space-y-1">
          <textarea
            value={value}
            onChange={(e) => handleInputChange(col.key, e.target.value)}
            className={`min-h-[60px] text-sm ${hasError ? "border-destructive" : ""}`}
          />
          {hasError && (
            <p className="text-xs text-destructive">{errors[col.key]}</p>
          )}
        </div>
      );

    case "number":
      return (
        <div className="space-y-1">
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(col.key, e.target.value)}
            className={`h-8 text-sm ${hasError ? "border-destructive" : ""}`}
          />
          {hasError && (
            <p className="text-xs text-destructive">{errors[col.key]}</p>
          )}
        </div>
      );

    case "date":
      return (
        <div className="space-y-1">
          <input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(col.key, e.target.value)}
            className={`h-8 text-sm ${hasError ? "border-destructive" : ""}`}
          />
          {hasError && (
            <p className="text-xs text-destructive">{errors[col.key]}</p>
          )}
        </div>
      );

    case "select":
  //     console.log(`🔍 Select Debug - ${col.key}:`, {
  //   currentValue: value,
  //   options: col.options,
  //   hasError: hasError,
  //   errorMessage: errors[col.key]
  // });
      return (
        <div className="space-y-1">
          <select value={value || ""} onChange={(e) => {
          console.log(`🎯 ${col.key} changed from: ${value} to: ${e.target.value}`);
          handleInputChange(col.key, e.target.value);
        }}
            className={`h-8 text-sm ${hasError ? "border-destructive" : ""}`}
          >
            <option value="" disabled>Pilih {col.label}</option>
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
        <div className="space-y-1">
          <input
            value={value}
            onChange={(e) => handleInputChange(col.key, e.target.value)}
            className={`h-8 text-sm ${hasError ? "border-destructive" : ""}`}
          />
          {hasError && (
            <p className="text-xs text-destructive">{errors[col.key]}</p>
          )}
        </div>
      );
  }
};