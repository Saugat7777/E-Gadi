import { TourProps, message } from "antd";

export const showMessage = (
  type: "success" | "error" | "warning",
  msg: string
) => {
  if (type === "success") return message.success(msg);
  if (type === "error") return message.error(msg);
  if (type === "warning") return message.warning(msg);
};

export const obtainToken = localStorage.getItem("accessToken") ?? "";
export const obtainNavigatePath = localStorage.getItem("navigatePath") ?? "";

export const validateEmail = (_: any, value: string) => {
  if (!value) {
    return Promise.reject("Email is required");
  }
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(value)) {
    return Promise.reject("Please, enter a valid email format");
  }
  return Promise.resolve();
};

// Array of predefined colors
const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "cyan",
  "magenta",
  "teal",
];

// Function to generate a random color from the array
export function generateRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
