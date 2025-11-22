"use client";

import { validateAllFields } from "@/lib/validateField";
import { useState } from "react";

export default function useEditableTable(columns) {
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [errors, setErrors] = useState({});

  // 🔹 Start editing row
  const startEdit = (row) => {
    setEditingId(row.id);
    setEditedData(row);
    setErrors({});
  };

  // 🔹 Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditedData({});
    setErrors({});
  };

  // 🔹 Handle input change (universal)
  const handleInputChange = (key, value) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  // 🔹 Validate + Save
  const saveEdit = async (onSaveCallback) => {
    const isValid = validateAllFields(columns, editedData, setErrors);
    if (!isValid) return false;

    await onSaveCallback(editedData);

    setEditingId(null);
    return true;
  };

  // 🔹 Delete wrapper
  const deleteRow = async (id, onDeleteCallback) => {
    await onDeleteCallback(id);
  };

  return {
    editingId,
    editedData,
    errors,
    startEdit,
    cancelEdit,
    handleInputChange,
    saveEdit,
    deleteRow,
  };
}
