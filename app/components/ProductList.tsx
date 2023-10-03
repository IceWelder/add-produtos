"use client"
import React, { useState } from 'react';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState<string>('');

  const handleAddProduct = () => {
    if (newProduct.trim() !== '') {
      setProducts([...products, newProduct]);
      setNewProduct('');
    }
  };

  const handleDeleteProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleUpdateProduct = (index: number, updatedValue: string) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedValue;
    setProducts(updatedProducts);
  };

  const handlePrintList = () => {
    const printContent = products.map((product, index) => (
      <div key={index} className="flex justify-between mb-2">
        <span>{product}</span>
      </div>
    ));

    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Lista de Produtos</title>
        </head>
        <body>
          <h2>Lista de Produtos</h2>
          <div>
            ${printContent.map((content) => content.outerHTML).join('')}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-gray-300 p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Lista de Produtos</h2>
        <div className="mb-2 flex">
          <input
            type="text"
            placeholder="Inserir produto"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded mr-2 flex-grow"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Inserir
          </button>
        </div>
        <ul>
          {products.map((product, index) => (
            <li key={index} className="mb-2 flex justify-between">
              <span>{product}</span>
              <div>
                <button
                  onClick={() => handleUpdateProduct(index, prompt('Editar produto:', product) || product)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteProduct(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={handlePrintList}
          className="bg-green-500 text-white px-2 py-1 rounded mt-4"
        >
          Imprimir Lista
        </button>
      </div>
    </div>
  );
};

export default ProductList;
