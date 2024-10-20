import { useEffect, useState } from "react";

// we can use useSWR instead
const useBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const getContent = async () => {
    const data = await fetch("/api/blogs")
      .then((res) => res.json())
      .catch((err) => console.log(err));
    setBlogs(data.data);
  };
  useEffect(() => {
    getContent();
  }, [blogs.length]);

  return {
    blogs: blogs,
  };
};
export default useBlog;
