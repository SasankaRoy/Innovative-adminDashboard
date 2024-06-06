import { Product } from '../../types/product';
import ProductOne from '../../images/product/product-01.png';
import ProductTwo from '../../images/product/product-02.png';
import ProductThree from '../../images/product/product-03.png';
import ProductFour from '../../images/product/product-04.png';

const productData: Product[] = [
  {
    image: ProductOne,
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    price: 296,
    sold: 22,
    profit: 45,
  },
  {
    image: ProductTwo,
    name: 'Macbook Pro M1',
    category: 'Electronics',
    price: 546,
    sold: 12,
    profit: 125,
  },
  {
    image: ProductThree,
    name: 'Dell Inspiron 15',
    category: 'Electronics',
    price: 443,
    sold: 64,
    profit: 247,
  },
  {
    image: ProductFour,
    name: 'HP Probook 450',
    category: 'Electronics',
    price: 499,
    sold: 72,
    profit: 103,
  },
];

const TableTwo = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sold</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Profit</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.image} alt="Product" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.sold}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${product.profit}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;



{/* <hr style={{ color: "black", margin: '0' }} />
<div className="row">

  <div className="col-md-10 p-4" style={{ height:'90vh',overflowY:'auto' }}>
  
    <div className="d-flex">
      <div className="fw-bold">
        {`Users(${users.length - 1})`}
      </div>

      <div className="w-50 ms-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
        />


      </div>
      
      <button
        className="btn btn-outline-primary ms-2"
        type="search"

      >
        Search
      </button>
      <button
        className="btn ms-2"
        style={{
          width: "fit-content",
          background: "#90EE90",
          whiteSpace: "nowrap",
        }}
        onClick={() => {
          setUpdate(false);
          setShowModal(true);
        }}
      >
        <AddIcon />
        <span className="ms-2">Create</span>
      </button>

    </div>




    <table className="table mt-4 p-4 w-70 text-center">
      <thead>
        <tr className="table-primary table-striped">
           <th scope="col">SN.</th> 
          <th  className='w-25'>Name</th>
          <th className='w-25'>Action</th>
        </tr>
      </thead>
      {users.length !== 0 && users.map((user, ind) =>
        user.email !== "admin@gmail.com" && (
          <tbody>
            <tr >
             <th scope="col">{ind + 1}</th> 
              <th className='w-25'> {user?.first_name + " " + user?.last_name}</th>

              <th className='w-25'>
                <CreateIcon
                  className="text-primary border border-primary rounded me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setUpdate(true)
                    setShowModal(true);
                    setFirstName(user?.first_name)
                    setLastName(user?.last_name)
                    setEmail(user?.email)
                    setPhone(user?.phone_no)
                    setPassword("")
                    setRole(user?.role)
                    setUserId(user?._id)
                  }}
                />
                <DeleteIcon
                  className="text-danger border border-danger cursor-pointer rounded"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDelete(user?._id)
                  }}
                />
              </th>
            </tr>
          </tbody>
        )

      )}



    </table>

  </div>
</div>

<Modal show={showModal} onHide={handleClose} size="lg" centered>
  <Modal.Header closeButton>
    <Modal.Title>
      {update ? "Update Users" : "Add Users"}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="row gy-2">
      <div className="mb-2">
        <label className="pb-1">First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </div>

      <div className="mb-2">
        <label className="pb-1">Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>

      <div className="mb-2">
        <label className="pb-1">Phone No</label>
        <input
          type="text"
          className="form-control"
          placeholder="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>

      <div className="mb-2">
        <label className="pb-1">Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="mb-2">
        <label className="pb-1">Password</label>
        <input
          type="text"
          className="form-control"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className="mb-2">
        <label className="pb-1">Role</label>
        <select value={role} onChange={handleRole} className="form-control">
          <option defaultValue="select role">Select Role</option>
          <option>User 1</option>
          <option>User 2</option>
          <option>User 3</option>
        </select>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button
      className="btn"
      style={{ background: "red", border: "none" }}
      onClick={handleClose}
    >
      Close
    </Button>
    <Button
      variant="primary"
      onClick={() => {
        update ? handleUpdate() : handleCreate();
      }}
    >
      {update ? "Update" : "Create"}
    </Button>
  </Modal.Footer>
</Modal> */}