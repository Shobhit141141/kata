import { API_URL } from "../config/constants";

export const fetchSweets = async () => {
  const res = await fetch(`${API_URL}/sweets`, { credentials: "include" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch sweets");
  }
  return await res.json();
};

export const fetchSweetById = async (id) => {
  const res = await fetch(`${API_URL}/sweets/${id}`, {
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch sweet");
  }
  return await res.json();
};

export const createSweet = async (formData) => {
  const res = await fetch(`${API_URL}/sweets`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create sweet");
  }
  return await res.json();
};

export const updateSweet = async (id, data) => {
  const res = await fetch(`${API_URL}/sweets/${id}`, {
    method: "PUT",
    credentials: "include",
    body: data, // FormData
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update sweet");
  }
  return await res.json();
};

export const deleteSweet = async (id) => {
  const res = await fetch(`${API_URL}/sweets/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete sweet");
  }
  return await res.json();
};
