import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  function submitData(event) {
    event.preventDefault();

    const newData = { ...state, id: crypto.randomUUID().toString() };

    mutation.mutate(newData);
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };
  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h1>Add a Product</h1>
      <form className="flex flex-col" onSubmit={submitData}>
        <input
          type="text"
          name="title"
          id=""
          value={state.title}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product title"
        />

        <textarea
          name="description"
          id=""
          value={state.description}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
        />
        <input
          type="number"
          name="price"
          id=""
          value={state.price}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product price"
        />
        <input
          type="number"
          name="rating"
          id=""
          value={state.rating}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product rating"
        />
        <input
          type="text"
          name="thumbnail"
          id=""
          value={state.thumbnail}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail"
        />

        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
