import axios from 'axios';

// import * as dotenv from "dotenv";

// dotenv.config();

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchFileTemplates = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    let templatesData = [];
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/template`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      templatesData = response.data.allTemplates;
      // console.log(templatesData)
    } catch (error: any) {
      // console.log("err", error);
      templatesData = error?.response?.data;
    } finally {
      return templatesData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const createFileTemplates = async (addData: any) => {
  let tempTemplates = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      console.log('template data', addData);

      await axios({
        method: 'post',
        url: `${API_URL}/api/template`,
        data: addData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not create templates");
      tempTemplates = error?.response?.data;
    } finally {
      return tempTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updateFileTemplates = async (updateData: any) => {
  let tempTemplates = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // console.log("template data", updateData);

      await axios({
        method: 'put',
        url: `${API_URL}/api/template`,
        data: updateData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not create templates");
      tempTemplates = error?.response?.data;
    } finally {
      return tempTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const deleteFileTemplates = async (deleteData: any) => {
  let tempTemplates = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/template`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not create templates");
      tempTemplates = error?.response?.data;
    } finally {
      return tempTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const fetchMcqTemplates = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    // console.log("fetch",import.meta.env.VITE_APP_BASE_URL)
    let templatesData = [];
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/mcq-template`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log("106",response)
      templatesData = response.data.allMcqTemplates;
    } catch (error: any) {
      // console.log("err", error);
      templatesData = error?.response?.data;
    } finally {
      return templatesData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const createMcqTemplates = async (addData: any) => {
  const token = localStorage.getItem('token');

  if (token) {
    let tempTemplates = [];
    try {
      console.log('template data', addData);

      await axios({
        method: 'post',
        url: `${API_URL}/api/mcq-template`,
        data: addData,
        headers: {
          'Content-Type': 'multipart/form-data',

          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not create templates");
      tempTemplates = error?.response?.data;
    } finally {
      return tempTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updateMcqTemplates = async (updateData: any) => {
  let tempTemplates = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'put',
        url: `${API_URL}/api/mcq-template`,
        data: updateData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not create templates");
      tempTemplates = error?.response?.data;
    } finally {
      return tempTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updateMcqTemplatesAttempts = async (updateData: any) => {
  let tempTemplates = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'put',
        url: `${API_URL}/api/mcq-template`,
        data: updateData,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not create templates");
      tempTemplates = error?.response?.data;
    } finally {
      return tempTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const deleteMcqTemplates = async (deleteData: any) => {
  let tempMcqTemplates = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/mcq-template`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempMcqTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not delete mcq templates");
      tempMcqTemplates = error?.response?.data;
    } finally {
      return tempMcqTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const createInvoices = async (addData: any) => {
  let tempInvoices = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      console.log('invoice data', addData);

      await axios({
        method: 'post',
        url: `${API_URL}/api/invoice`,
        data: addData,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempInvoices = res.data;
      });
    } catch (error: any) {
      // console.log("can not create templates");
      tempInvoices = error?.response?.data;
    } finally {
      return tempInvoices;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const fetchInvoices = async () => {
  let invoicesData = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/invoice`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      invoicesData = response.data.fetchedData;
      // console.log(templatesData)
    } catch (error: any) {
      // console.log("err", error);
      invoicesData = error?.response?.data;
    } finally {
      return invoicesData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updateInvoices = async (updateData: any) => {
  let invoicesData = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'put',
        url: `${API_URL}/api/invoice`,
        data: updateData,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        invoicesData = res.data;
      });
    } catch (error: any) {
      // console.log("can not update invoices");
      invoicesData = error?.response?.data;
    } finally {
      return invoicesData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const deleteInvoices = async (deleteData: any) => {
  let tempInvoice = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/invoice`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempInvoice = res.data;
      });
    } catch (error: any) {
      // console.log("can not delete invoice");
      tempInvoice = error?.response?.data;
    } finally {
      return tempInvoice;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const fetchUsers = async () => {
  const token = localStorage.getItem('token');
  let usersData = [];

  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/user`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      usersData = response.data.allUserData;
    } catch (error: any) {
      // console.log("err", error);
      usersData = error?.response?.data;
    } finally {
      return usersData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const createUsers = async (userData: any) => {
  let tempUsers = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // console.log("userData", userData);

      await axios({
        method: 'post',
        url: `${API_URL}/api/user/create-user`,
        data: userData,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempUsers = res.data;
      });
    } catch (error: any) {
      // console.log("can not save users");
      tempUsers = error?.response?.data;
    } finally {
      return tempUsers;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updateUsers = async (userData: any) => {
  let tempUsers = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // console.log("userData", userData);

      await axios({
        method: 'put',
        url: `${API_URL}/api/user/`,
        data: userData,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempUsers = res.data;
      });
    } catch (error: any) {
      // console.log("can not update users");
      tempUsers = error?.response?.data;
    } finally {
      return tempUsers;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const deleteUsers = async (deleteData: any) => {
  let tempUser = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/user`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempUser = res.data;
      });
    } catch (error: any) {
      // console.log("can not delete user");
      tempUser = error?.response?.data;
    } finally {
      return tempUser;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const createPurchaseOrders = async (addData:any) => {
  let tempPurchaseOrders = [];
  const token =localStorage.getItem('token')

  if(token){
  try {
    // console.log("po data", addData);

    await axios({
      method: "post",
      url: `${API_URL}/api/purchase-order`,
      data: addData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempPurchaseOrders = res.data;
    });
  } catch (error:any) {
    // console.log("can not create purchase order");
    tempPurchaseOrders=error?.response?.data;
  } finally {
    return tempPurchaseOrders;
  }}else {
    return { message: 'jwt is not present' };
  }
};

export const fetchPurchaseOrders = async () => {
  let tempPurchaseOrders = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/purchase-order`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      tempPurchaseOrders = response.data.fetchedData;
    } catch (error: any) {
      // console.log("err", error);
      tempPurchaseOrders = error?.response?.data;
    } finally {
      return tempPurchaseOrders;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updatePurchaseOrders = async (updateData:any) => {
  let poData = [];
  const token=localStorage.getItem('token')

  if(token){
  try {
    await axios({
      method: "put",
      url: `${API_URL}/api/purchase-order`,
      data: updateData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      poData = res.data;
    });
  } catch (error:any) {
    // console.log("can not update purchase orders");
    poData=error?.response?.data;
  } finally {
    return poData;
  }}else {
    return { message: 'jwt is not present' };
  }
};

export const deletePurchaseOrders = async (deleteData:any) => {
  let tempPurchaseOrders = [];
  const token=localStorage.getItem('token')

  if(token){
  try {
    await axios({
      method: "delete",
      url: `${API_URL}/api/purchase-order`,
      data: deleteData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempPurchaseOrders = res.data;
    });
  } catch (error:any) {
    // console.log("can not delete purchase orders");
    tempPurchaseOrders=error?.response?.data;
  } finally {
    return tempPurchaseOrders;
  }}else {
    return { message: 'jwt is not present' };
  }
};

export const createQuizTemplates = async (addData: any) => {
  let tempTemplates = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // console.log("template data", addData);

      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
        data: addData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not create templates");
      tempTemplates = error?.response?.data;
    } finally {
      return tempTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updateQuizTemplates = async (updateData: any) => {
  let tempQuizTemplates = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'put',
        url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
        data: updateData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempQuizTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not create templates");
      tempQuizTemplates = error?.response?.data;
    } finally {
      return tempQuizTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const deleteQuizTemplates = async (deleteData: any) => {
  let tempQuizTemplates = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_BASE_URL}/api/quiz-template`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempQuizTemplates = res.data;
      });
    } catch (error: any) {
      // console.log("can not delete quiz templates");
      tempQuizTemplates = error?.response?.data;
    } finally {
      return tempQuizTemplates;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const fetchQuizTemplates = async () => {
  let templatesData = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/quiz-template`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      templatesData = response.data.allQuizTemplates;
      // console.log(templatesData)
    } catch (error: any) {
      // console.log("err", error);
      templatesData = error?.response?.data;
    } finally {
      return templatesData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// export const createFaqs = async (faqData) => {
//   let tempFaq = [];
//   try {
//     // console.log("userData", userData);

//     await axios({
//       method: "post",
//       url: `${process.env.REACT_APP_BASE_URL}/api/faq`,
//       data: faqData,
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${token}`,
//       },
//     }).then((res) => {
//       tempFaq = res.data;
//     });
//   } catch (error) {
//     tempFaq = error?.response?.data;
//   } finally {
//     return tempFaq;
//   }
// };

// export const fetchFaqs = async () => {
//   let faqsData = [];
//   // console.log("fetch faq")
//   try {
//     const response = await axios({
//       method: "get",
//       url: `${process.env.REACT_APP_BASE_URL}/api/faq`,
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     faqsData = response.data.allFaqData;
//   } catch (error) {
//     // console.log("err", error);
//     faqsData = error?.response?.data;
//   } finally {
//     return faqsData;
//   }
// };

// export const updateFaqs = async (faqData) => {
//   let tempFaq = [];
//   try {
//     // console.log("userData", userData);

//     await axios({
//       method: "put",
//       url: `${process.env.REACT_APP_BASE_URL}/api/faq/`,
//       data: faqData,
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${token}`,
//       },
//     }).then((res) => {
//       tempFaq = res.data;
//     });
//   } catch (error) {
//     console.log("can not update faq");
//   } finally {
//     return tempFaq;
//   }
// };

// export const deleteFaqs = async (deleteData) => {
//   let tempFaq = [];
//   try {
//     await axios({
//       method: "delete",
//       url: `${process.env.REACT_APP_BASE_URL}/api/faq`,
//       data: deleteData,
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     }).then((res) => {
//       tempFaq = res.data;
//     });
//   } catch (error) {
//     console.log("can not delete faq");
//   } finally {
//     return tempFaq;
//   }
// };

export const createGallery = async (addData: any) => {
  let tempGallery = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // console.log("template data", addData);

      await axios({
        method: 'post',
        url: `${API_URL}/api/gallery`,
        data: addData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempGallery = res.data;
      });
    } catch (error: any) {
      // console.log("can not create gallery");
      tempGallery = error?.response?.data;
    } finally {
      return tempGallery;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const fetchGalleries = async () => {
  let galleriesData = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/gallery`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      galleriesData = response.data.allGalleryData;
    } catch (error: any) {
      // console.log("err", error);
      galleriesData = error?.response?.data;
    } finally {
      return galleriesData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updateGallery = async (updateData: any) => {
  let tempGalleries = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'put',
        url: `${API_URL}/api/gallery`,
        data: updateData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempGalleries = res.data;
      });
    } catch (error: any) {
      // console.log("can not update galleries");
      tempGalleries = error?.response?.data;
    } finally {
      return tempGalleries;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const deleteGallery = async (deleteData: any) => {
  let tempGallery = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/gallery`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempGallery = res.data;
      });
    } catch (error: any) {
      // console.log("can not delete gallery");
      tempGallery = error?.response?.data;
    } finally {
      return tempGallery;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const createCategories = async (addData: any) => {
  let tempCategory = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'post',
        url: `${API_URL}/api/category`,
        data: addData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempCategory = res.data;
      });
    } catch (error: any) {
      // console.log("can not create category");
      tempCategory = error?.response?.data;
    } finally {
      return tempCategory;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const fetchCategories = async () => {
  const token = localStorage.getItem('token');
  let categoriesData = [];

  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/category`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      categoriesData = response.data.allCategoryData;
    } catch (error: any) {
      // console.log("err", error);
      categoriesData = error?.response?.data;
    } finally {
      return categoriesData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updateCategories = async (updateData: any) => {
  let tempCats = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'put',
        url: `${API_URL}/api/category`,
        data: updateData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempCats = res.data;
      });
    } catch (error: any) {
      // console.log("can not update categories");
      tempCats = error?.response?.data;
    } finally {
      return tempCats;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const deleteCategories = async (deleteData: any) => {
  let tempCat = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/category`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempCat = res.data;
      });
    } catch (error: any) {
      // console.log("can not delete category");
      tempCat = error?.response?.data;
    } finally {
      return tempCat;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const createProducts = async (addData: any) => {
  let tempProducts = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      // console.log("template data", addData);

      await axios({
        method: 'post',
        url: `${API_URL}/api/product`,
        data: addData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempProducts = res.data;
      });
    } catch (error: any) {
      // console.log("can not create product");
      tempProducts = error?.response?.data;
    } finally {
      return tempProducts;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const fetchProducts = async () => {
  let productsData = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/product`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      productsData = response.data.fetchedData;
    } catch (error: any) {
      // console.log("err", error);
      productsData = error?.response?.data;
    } finally {
      return productsData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const updateProducts = async (updateData: any) => {
  let tempProds = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'put',
        url: `${API_URL}/api/product`,
        data: updateData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempProds = res.data;
      });
    } catch (error: any) {
      // console.log("can not update products");
      tempProds = error?.response?.data;
    } finally {
      return tempProds;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

export const deleteProducts = async (deleteData: any) => {
  let tempProd = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/product`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempProd = res.data;
      });
    } catch (error: any) {
      // console.log("can not delete product");
      tempProd = error?.response?.data;
    } finally {
      return tempProd;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// training modules all api routes and calls start.....

// get all modules here...
export const fetchTrainingModules = async () => {
  let moduleData = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/training-module`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      moduleData = response.data.fetchedData;
    } catch (error:any) {
      moduleData = error?.response?.data;
    } finally {
      return moduleData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// create modules here...
export const createTrainingModules = async (addData: any) => {
  let tempModules = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'post',
        url: `${API_URL}/api/training-module`,
        data: addData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempModules = res.data;
      });
    } catch (error:any) {
      tempModules = error?.response?.data;
    } finally {
      return tempModules;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// update modules here...
export const updateTrainingModules = async (updateData: any) => {
  let tempModules = [];
  const token = localStorage.getItem('token');
  try {
    await axios({
      method: 'put',
      url: `${API_URL}/api/training-module`,
      data: updateData,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    }).then((res:any) => {
      tempModules = res.data;
    });
  } catch (error) {
    // console.log("can not update training modules");
    tempModules = error?.response?.data;
  } finally {
    return tempModules;
  }
};

export const deleteTrainingModules = async (deleteData: any) => {
  let tempModules = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/training-module`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempModules = res.data;
      });
    } catch (error:any) {
      // console.log("can not delete training modules");
      tempModules = error?.response?.data;
    } finally {
      return tempModules;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// training modules all api routes and calls end.....

// choose us start....

// get all choose us data...
export const fetchCus = async () => {
  let cusData = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/choose-us`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      cusData = response.data.allCusData;
    } catch (error:any) {
      // console.log("err", error);
      cusData = error?.response?.data;
    } finally {
      return cusData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// create new choose us data...
export const createCus = async (faqData: any) => {
  let tempCus = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // console.log("userData", userData);

      await axios({
        method: 'post',
        url: `${API_URL}/api/choose-us`,
        data: faqData,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempCus = res.data;
      });
    } catch (error:any) {
      // console.log("can not save cus");
      tempCus = error?.response?.data;
    } finally {
      return tempCus;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// update choose us data....

export const updateCus = async (faqData: any) => {
  let tempCus = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'put',
        url: `${API_URL}/api/choose-us`,
        data: faqData,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempCus = res.data;
      });
    } catch (error) {
      // console.log("can not update cus");
      tempCus = error?.response?.data;
    } finally {
      return tempCus;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// delete choose us data....

export const deleteCus = async (deleteData: any) => {
  let tempCus = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/choose-us`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempCus = res.data;
      });
    } catch (error) {
      tempCus = error?.response?.data;
    } finally {
      return tempCus;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// choose us end....

// partner management start.....

// get all partner...
export const fetchPartners = async () => {
  let partnersData = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/partner`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      partnersData = response.data.allPartnerData;
    } catch (error) {
      // console.log("err", error);
      partnersData = error?.response?.data;
    } finally {
      return partnersData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// create new partner...
export const createPartners = async (partnerData: any) => {
  let tempPartner = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'post',
        url: `${API_URL}/api/partner`,
        data: partnerData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempPartner = res.data;
      });
    } catch (error) {
      // console.log("can not save partner");
      tempPartner = error?.response?.data;
    } finally {
      return tempPartner;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// update partner...

export const updatePartners = async (faqData: any) => {
  let tempPartner = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'put',
        url: `${API_URL}/api/partner/`,
        data: faqData,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempPartner = res.data;
      });
    } catch (error) {
      // console.log("can not update partner");
      tempPartner = error?.response?.data;
    } finally {
      return tempPartner;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// delete partner...
export const deletePartners = async (deleteData: any) => {
  let tempPartner = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios({
        method: 'delete',
        url: `${API_URL}/api/partner`,
        data: deleteData,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempPartner = res.data;
      });
    } catch (error) {
      // console.log("can not delete partner");
      tempPartner = error?.response?.data;
    } finally {
      return tempPartner;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};

// partner management end.....

// services management start....

// get all services data...
export const fetchServices = async () => {
  let serviceData = [];
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios({
        method: 'get',
        url: `${API_URL}/api/service`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      serviceData = response.data.fetchedData;
    } catch (error) {
      // console.log("err", error);
      serviceData = error?.response?.data;
    } finally {
      return serviceData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};


// create services ................

export const createServices = async (addData:any) => {
  let tempServices = [];
  const token = localStorage.getItem('token');

  if(token){
    try {
      // console.log("template data", addData);
  
      await axios({
        method: "post",
        url: `${API_URL}/api/service`,
        data: addData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempServices = res.data;
      });
    } catch (error) {
      // console.log("can not create service");
      tempServices=error?.response?.data;
    } finally {
      return tempServices;
    }

  }else{
    return {message:'jwt is not present'}
  }
};

// update service...

export const updateServices = async (updateData:any) => {
  let serviceData = [];
  const token = localStorage.getItem('token');
  if(token){
    try {
      await axios({
        method: "put",
        url: `${API_URL}/api/service`,
        data: updateData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        serviceData = res.data;
      });
    } catch (error) {
      // console.log("can not update services");
      serviceData=error?.response?.data;
    } finally {
      return serviceData;
    }
  }else{
    return {message:'jwt is not present'}
  }
};



export const createAboutUs = async (aboutUsData: any) => {
  let tempAboutUsData = [];
  const token = localStorage.getItem('token')
  if (token) {
    try {
      // console.log("userData", userData);

      await axios({
        method: "post",
        url: `${API_URL}/api/about-us`,
        data: aboutUsData,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempAboutUsData = res.data;
      });
    } catch (error: any) {
      tempAboutUsData = error?.response?.data;
    } finally {
      return tempAboutUsData;
    }
  } else {
    return { message: 'jwt is not present' }
  }
};

export const fetchAboutUs = async () => {
  let tempAboutUsData = [];
  const token = localStorage.getItem('token')

  if (token) {
    try {
      const response = await axios({
        method: "get",
        url: `${API_URL}/api/about-us`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      tempAboutUsData = response.data.allAboutUsData;
    } catch (error: any) {
      tempAboutUsData = error?.response?.data;
    } finally {
      return tempAboutUsData;
    }
  } else {
    return { message: 'jwt is not present' }
  }
};

export const updateAboutUs = async (aboutUsData: any) => {
  let tempAboutUsData = [];
  const token = localStorage.getItem('token')
  if (token) {
    try {
      // console.log("userData", userData);

      await axios({
        method: "put",
        url: `${API_URL}/api/about-us/`,
        data: aboutUsData,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        tempAboutUsData = res.data;
      });
    } catch (error: any) {
      tempAboutUsData = error?.response?.data;
    } finally {
      return tempAboutUsData;
    }
  } else {
    return { message: 'jwt is not present' }
  }
};


export const createOurMission = async (omData:any) => {
  let tempOurMission = [];

  const token=localStorage.getItem('token')

  if(token){
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${API_URL}/api/our-mission`,
      data: omData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempOurMission = res.data;
    });
  } catch (error:any) {
    tempOurMission = error?.response?.data;
  } finally {
    return tempOurMission;
  }}else {
    return { message: 'jwt is not present' }
  }
};

export const fetchOurMission  = async () => {
  let tempOurMission = [];
  const token=localStorage.getItem('token')

  if(token){
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/api/our-mission`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    tempOurMission = response.data.allOmData;
  } catch (error:any) {
    tempOurMission = error?.response?.data;
  } finally {
    return tempOurMission;
  }}else {
    return { message: 'jwt is not present' }
  }
};

export const updateOurMission = async (omData:any) => {
  let tempOurMission = [];
  const token=localStorage.getItem('token')

  if(token){
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${API_URL}/api/our-mission/`,
      data: omData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempOurMission = res.data;
    });
  } catch (error:any) {
    tempOurMission = error?.response?.data;
  } finally {
    return tempOurMission;
  }}else {
    return { message: 'jwt is not present' }
  }
};

export const createOurVision = async (ovData:any) => {
  let tempOurVision = [];
  const token=localStorage.getItem('token')

  if(token){
  try {
    // console.log("userData", userData);

    await axios({
      method: "post",
      url: `${API_URL}/api/our-vision`,
      data: ovData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempOurVision = res.data;
    });
  } catch (error:any) {
    tempOurVision = error?.response?.data;
  } finally {
    return tempOurVision;
  }}else {
    return { message: 'jwt is not present' }
  }
};

export const fetchOurVision  = async () => {
  let tempOurVision = [];

  const token=localStorage.getItem('token')
  
  if(token){
  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/api/our-vision`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    tempOurVision = response.data.allOvData;
  } catch (error:any) {
    tempOurVision = error?.response?.data;
  } finally {
    return tempOurVision;
  }}else {
    return { message: 'jwt is not present' }
  }
};

export const updateOurVision = async (ovData:any) => {
  let tempOurVision = [];
  const token=localStorage.getItem('token')

  if(token){
  try {
    // console.log("userData", userData);

    await axios({
      method: "put",
      url: `${API_URL}/api/our-vision/`,
      data: ovData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempOurVision = res.data;
    });
  } catch (error:any) {
    tempOurVision = error?.response?.data;
  } finally {
    return tempOurVision;
  }}else {
    return { message: 'jwt is not present' }
  }
};

export const createTestimonials = async (addData:any) => {
  let tempMons = [];
  const token=localStorage.getItem('token')

  if(token){
  try {
    // console.log("template data", addData);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/testimonial`,
      data: addData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempMons = res.data;
    });
  } catch (error:any) {
    // console.log("can not create testimonials");
    tempMons=error?.response?.data;
  } finally {
    return tempMons;
  }}else {
    return { message: 'jwt is not present' }
  }
};

export const fetchTestimonials = async () => {
  let testimonialData = [];
const token=localStorage.getItem('token')
  if(token){
  try {
    const response = await axios({
      method: "get",

      url: `${API_URL}/api/testimonial`,

      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    testimonialData = response.data.fetchedData;
  } catch (error:any) {
    // console.log("err", error);
    testimonialData=error?.response?.data;
  } finally {
    return testimonialData;
  }}else {
    return { message: 'jwt is not present' }
  }
};

export const updateTestimonials = async (updateData:any) => {
  let tempMons = [];
  const token=localStorage.getItem('token')
  
  if(token){
  try {
    await axios({
      method: "put",
      url: `${API_URL}/api/testimonial`,
      data: updateData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      tempMons = res.data;
    });
  } catch (error:any) {
    // console.log("can not update testimonials");
    tempMons=error?.response?.data;
  } finally {
    return tempMons;
  }}else {
    return { message: 'jwt is not present' }
  }
};



export const logIn = async (userData: any) => {
  let tempUsers = [];
  try {
    console.log('userData', userData);
    await axios({
      method: 'post',
      url: `${API_URL}/api/user/signin`,
      data: userData,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      tempUsers = res.data;
    });
  } catch (error: any) {
    tempUsers = error?.response?.data;
  } finally {
    return tempUsers;
  }
};

export const verifyToken = async () => {
  let tokenData = [];
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios({
        method: 'post',
        url: `${API_URL}/api/user/verify-token`,
        data: { jwt_token: token },
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        tokenData = res.data;
      });
    } catch (error: any) {
      tokenData = error?.response?.data;
    } finally {
      return tokenData;
    }
  } else {
    return { message: 'jwt is not present' };
  }
};



