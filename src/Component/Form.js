import { useState, useEffect } from "react";
//import {  updatePost } from "../Api/PostApi"; // Make sure `updatePost` is implemented

const Form = ({ data, setData, updateDataApi, setUpdateDataApi, setFilteredData }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        // Populate the form with data when in edit mode
        if (updateDataApi?.id) {
            setTitle(updateDataApi.title);
            setBody(updateDataApi.body);
        }
    }, [updateDataApi]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (updateDataApi?.id) {
            // Edit existing post
           
        
        }

        // Clear the form fields after submission
        setTitle("");
        setBody("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Enter body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            <button type="submit" className="submit-btn">
                {updateDataApi?.id ? "Update Post" : "Add Post"}
            </button>
        </form>
    );
};

export default Form;
