import { API_URL } from "../config/constants";

export const restockSweet = async (id, amount) => {
  const res = await fetch(`${API_URL}/inventory/${id}/restock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
    credentials: "include",
  });
  if (!res.ok) {
    let errMsg = "Restock failed";
    const err = await res.json();
    errMsg = err.message || errMsg;
    throw new Error(errMsg);
  }
  return await res.json();
};

export const purchaseSweet = async (id, amount) => {
  const res = await fetch(`${API_URL}/inventory/${id}/purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
    credentials: "include",
  });
  if (!res.ok) {
    let errMsg = "Purchase failed";
    const err = await res.json();
    errMsg = err.message || errMsg;
    throw new Error(errMsg);
  }
  return await res.json();
}
