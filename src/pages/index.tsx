import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [content, setContent] = useState([]);
  const [perPage, setPerPage] = useState(10); // Default per page
  const [sortBy, setSortBy] = useState("-published_at"); // Default sort by
  const [totalPages, setTotalPages] = useState(1); // Total pages from API response
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalResults, setTotalResults] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [perPage, sortBy, currentPage]); // Fetch data when perPage, sortBy, or currentPage changes

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage}&page[size]=${perPage}&sort=${sortBy}&append[]=small_image&append[]=medium_image&sort=-published_at`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);

      const dataContent = data.data.map((info: any) => ({
        published_at: info.published_at,
        title: info.title,
        image: info.medium_image[0].url,
      }));

      setTotalPages(data.meta.last_page);
      setTotalResults(data.meta.total);
      setFrom(data.meta.from)
      setTo(data.meta.to);
      setContent(dataContent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePerPageChange = (value: any) => {
    setPerPage(value);
    setCurrentPage(1); // Reset to first page when changing per page
  };

  const handleSortByChange = (value: any) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when changing sort by
  };

  const handlePageNumberClick = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Maximum number of pages to show at once
  
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
    
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  
    const handlePrevClick = () => {
      const newStartPage = Math.max(1, startPage - maxPagesToShow);
      const newEndPage = Math.min(totalPages, newStartPage + maxPagesToShow - 1);
      startPage = newStartPage;
      endPage = newEndPage;
      
    };
  
    const handleNextClick = () => {
      const newStartPage = endPage + 1;
      const newEndPage = Math.min(totalPages, newStartPage + maxPagesToShow - 1);
      startPage = newStartPage;
      endPage = newEndPage;
      
    };
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageNumberClick(i)}
          style={{
            marginRight: 5,
            background: currentPage === i ? "#EB6125" : "white",
            color: currentPage === i ? "white" : "black",
            border: "1px solid #ccc",
            borderRadius: 3,
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          {i}
        </button>
      );
    }
  
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        {startPage > 1 && (
          <button onClick={handlePrevClick}>
            {"<"}
          </button>
        )}
        {pageNumbers}
        {endPage < totalPages && (
          <button onClick={handleNextClick}>
            {">"}
          </button>
        )}
      </div>
    );
  };
  

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 50,
          paddingRight: 50,
          backgroundColor: "#EB6125",
        }}
      >
        <Link href={"/"}>
          <Image
            src={"/suitmedialogo.png"}
            width={70}
            height={50}
            alt="logo suitmedia"
          />
        </Link>
        <div style={{ display: "flex", alignItems: "center", color: "white" }}>
          <Link
            href={"/work"}
            style={
              router.pathname === "/work"
                ? { borderBottomColor: "white", borderBottomWidth: 3 }
                : { padding: 20 }
            }
          >
            Work
          </Link>
          <Link
            href={"/about"}
            style={
              router.pathname === "/about"
                ? { borderBottomColor: "white", borderBottomWidth: 3 }
                : { padding: 20 }
            }
          >
            About
          </Link>
          <Link
            href={"/service"}
            style={
              router.pathname === "/service"
                ? { borderBottomColor: "white", borderBottomWidth: 3 }
                : { padding: 20 }
            }
          >
            Service
          </Link>
          <Link
            href={"/"}
            style={
              router.pathname === "/"
                ? { borderBottomColor: "white", borderBottomWidth: 3 }
                : { padding: 20 }
            }
          >
            Ideas
          </Link>
          <Link
            href={"/career"}
            style={
              router.pathname === "/career"
                ? { borderBottomColor: "white", borderBottomWidth: 3 }
                : { padding: 20 }
            }
          >
            Career
          </Link>
          <Link
            href={"/contact"}
            style={
              router.pathname === "/contact"
                ? { borderBottomColor: "white", borderBottomWidth: 3 }
                : { padding: 20 }
            }
          >
            Contact
          </Link>
        </div>
      </div>

      <div style={{ position: "relative", color: "white" }}>
        <Image
          src={"/banner.jpg"}
          alt="banner"
          width={600}
          height={315}
          objectFit="cover"
          style={{
            width: "100%",
            height: "300px",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 70%, 0% 100%)",
          }}
        />
        <div
          style={{
            width: "fit-content",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p style={{ textAlign: "center", fontSize: 30 }}>Ideas</p>
          <p>Where all of our great things begin</p>
        </div>
      </div>

      {/* Dropdowns */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <div style={{marginRight: 20 }}>
          Showing {from} - {to} from {totalResults}
        </div>
        <div style={{ marginRight: 20 }}>
          Show per page:
          <select
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 20,
              marginLeft: 10,
            }}
            value={perPage}
            onChange={(e) => handlePerPageChange(e.target.value)}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          Sort by:
          <select
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 20,
              marginLeft: 10,
            }}
            value={sortBy}
            onChange={(e) => handleSortByChange(e.target.value)}
          >
            <option value="-published_at">Newest First</option>
            <option value="published_at">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Content section */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {content.map((item: any, index) => (
          <div
            key={index}
            style={{
              margin: 15,
              width: "25%",
              height: "70%",
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: 20,
            }}
          >
            <Image src={item.image} alt={item.title} width={400} height={200} />
            <p>{item.published_at}</p>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        {renderPagination()}
      </div>

    </div>
  );
}
