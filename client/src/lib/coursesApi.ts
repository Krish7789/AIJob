import axios from "axios";
import { Course } from "@/types/course";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchCourses(params?: Record<string, any>) {
  const res = await axios.get(`${API}/api/courses`, { params });
  return res.data.courses as Course[];
}

export async function recommendCourses(payload: {
  strengths: string[];
  weaknesses: string[];
  goal?: string;
}) {
  const res = await axios.post(`${API}/api/courses/recommend`, payload);
  return res.data.recommendations as Course[];
}
