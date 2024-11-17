import { useEffect, useState } from "react";
import { getPost, deletePost } from "../Api/PostApi";
import '../App.css';
import Form from "./Form";

export const Posts = () => {
    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({});
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // Number of posts to display per page

    const getPostData = async () => {
        const res = await getPost();
        setData(res.data);
        setFilteredData(res.data);
    }

    useEffect(() => {
        getPostData();
    }, []);

    const handleDeletePost = async (id) => {
        try {
            const delRes = await deletePost(id);
            if (delRes.status === 200) {
                const newUpdatedPosts = data.filter((curPost) => curPost.id !== id);
                setData(newUpdatedPosts);
                setFilteredData(newUpdatedPosts);
            }
        } catch (error) {
            console.log("Failed to delete this post.", error);
        }
    }

    const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

    const handleSearch = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        setSearchTerm(searchQuery);

        const filteredPosts = data.filter((post) => {
            return (
                post.title.toLowerCase().includes(searchQuery) ||
                post.body.toLowerCase().includes(searchQuery)
            );
        });

        setFilteredData(filteredPosts);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Calculate current posts based on currentPage and postsPerPage
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / postsPerPage);

    // Calculate the range of buttons to display
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    // Adjust startPage if endPage is at its maximum
    if (endPage - startPage < maxButtonsToShow - 1) {
        startPage = Math.max(1, endPage - (maxButtonsToShow - 1));
    }

    // Handlers for Next and Previous buttons
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <section>
                <Form 
                    data={data} 
                    setData={setData} 
                    updateDataApi={updateDataApi} 
                    setUpdateDataApi={setUpdateDataApi}
                    setFilteredData={setFilteredData} 
                />
            </section>

            {/* Search Input */}
            <section>
                <input
                    type="text"
                    placeholder="Search by title or body..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
            </section>

            <section className="section-post">
                <ol>
                    {currentPosts.length > 0 ? (
                        currentPosts.map((curElem) => {
                            const { id, body, title } = curElem;
                            return (
                                <li key={id}>
                                    <p><b>Title:</b> {title}</p>
                                    <p><b>Author:</b> {body}</p>
                                    <button
                                        className="postBtn btn-primary"
                                        onClick={() => handleUpdatePost(curElem)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="postBtn btn-danger"
                                        onClick={() => handleDeletePost(id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                        <p>No posts found.</p>
                    )}
                </ol>

                {/* Pagination Controls */}
                <div className="pagination">
                    <button 
                        onClick={handlePrev} 
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        Previous
                    </button>

                    {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                        <button
                            key={startPage + index}
                            onClick={() => paginate(startPage + index)}
                            className={currentPage === startPage + index ? 'active' : ''}
                        >
                            {startPage + index}
                        </button>
                    ))}

                    <button 
                        onClick={handleNext} 
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            </section>
        </>
    );
};
