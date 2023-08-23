import React, { useEffect,  useState } from 'react'
import { getProduct } from "services/product.service";
import Card from "components/card";
import {  deleteProduct } from "services/product.service";
import "react-responsive-modal/styles.css";
import 'react-pure-modal/dist/react-pure-modal.min.css';
import NewModal from './components/NewModal';
import EditModal from './components/EditModal';

const Product = () => {

    const initalState: ProductObj = {
        name: "",
        description: "",
        image: "",
        price: "",
        owner: "",
        _id: ""
    }
    const [modal, setModal] = useState(false);
    const [newmodal, setNewModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductObj>(initalState);

    const [products, setProduct] = useState<ProductObj[]>([]);
    const [reload, setReload] = useState(true);
    const [inputs, setInputs] = useState<ProductObj>(initalState);

    useEffect(() => {
        if (reload) {
            getProduct().then(
                (res: any) => {
                    setProduct(res.data);
                    setReload(false);
                });
        }
    }, [reload]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setInputs(values => ({ ...values, [name]: value }));
        setSelectedProduct(values => ({ ...values, [name]: value }))
    }
    const handleUpdate = (product: ProductObj) => {
        setSelectedProduct(product);
        setModal(true);
        setReload(true);

    }
    const handleDelete = async (id: string) => {
        await deleteProduct(id);
        setReload(true);

    }
    const productAdd = () => {
        setReload(true);
        setNewModal(true);
    }

    return (
        <div>
            <button className="linear my-4 flex items-center justify-center rounded-xl bg-brand-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" onClick={productAdd}>
                New Product
            </button>
            <Card extra={"w-full sm:overflow-auto px-6"}>
                <header className="relative flex items-center justify-between pt-4">
                    <div className="my-5 text-xl font-bold text-navy-700 dark:text-white">
                        Product Introduct
                    </div>
                </header>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <span>Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Update
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, key) => (

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900" key={key}>
                                    <td className="w-10 p-2">
                                        <img src={`http://localhost:8090/images/users/${product.image}`} alt="noImg" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.description}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                            <button onClick={() => product._id && handleUpdate(product)} type="button" data-modal-show="editUserModal" className="text-md font-bold text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" onClick={() => product._id && handleDelete(product._id)} className="font-bold text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <NewModal setReload={setReload} newmodal={newmodal} setNewModal={setNewModal} inputs={inputs} selectedProduct={selectedProduct} handleChange={handleChange} />
                    {selectedProduct && (
                        <EditModal setReload={setReload} modal={modal} setModal={setModal} selectedProduct={selectedProduct} handleChange={handleChange} />
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Product;