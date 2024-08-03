import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const retriveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}?_page=${queryKey[1].page}&_per_page=6`
  );
  return response.data;
};

const ProductList = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  console.log(page);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retriveProducts,
  });

  const mutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/products/${id}`),
    onSuccess: () => {
      console.log("ase");
      queryClient.invalidateQueries(["products"]);
    },
  });

  function deleteData(id) {
    mutation.mutate(id);
  }

  if (isLoading) return <div>Featching Products....</div>;
  if (error) return <div>An error occured: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products.data &&
          products.data.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2 border rounded-sm"
            >
              <img
                className="object-cover h-64 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />
              <p className="text-xl my-3">{product.title}</p>
              <button
                className="my-2 px-4 py-2 bg-black text-white"
                onClick={(e) => deleteData(product.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
      {/* <button
        onClick={() =>
          setPage((pre) => {
            if (pre === 1) {
              return pre;
            } else {
              return pre - 1;
            }
          })
        }
      >
        Previous
      </button>
      <button onClick={() => setPage((pre) => pre + 1)}>Next</button> */}

      <div>
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            Prev
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
