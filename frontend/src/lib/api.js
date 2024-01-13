import axios from "axios";
const token = document.cookie.split("token=")[1];
axios.defaults.headers.common["Authorization"] = token;

export const registerUser = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    // return {errors:['Passwords do not match']};
    return {
      response: {
        data: { status: { code: 422, message: "Passwords do not match" } },
      },
    };
  }

  const newUser = {
    user: {
      first_name: formData.get("firstName"),
      middle_name: formData.get("middleName"),
      last_name: formData.get("lastName"),
      username: formData.get("username"),
      password: formData.get("password"),
      birthday: formData.get("birthday"),
      email: formData.get("email"),
      role: "Trader",
      status: "pending",
      email_confirmed: false,
    },
  };
  try {
    const res = await axios.post("http://localhost:3000/signup", newUser);
    return res;
  } catch (error) {
    if (error.response) {
      return error;
    } else {
      return error;
    }
  }
};

export const logoutUser = async (event) => {
  event.preventDefault();

  try {
    const res = await axios.delete("http://localhost:3000/logout");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const addBalance = async (balance, user_id, transactionData) => {
  try {
    const addBalanceResponse = await axios.post(
      "http://localhost:3000/add_balance",
      {
        balance,
        user_id,
      }
    );

    const transactionResponse = await axios.post(
      "http://localhost:3000/transactions",
      {
        balance,
        user_id,
        ...transactionData,
      }
    );

    return {
      addBalanceResponse: addBalanceResponse.data,
      transactionResponse: transactionResponse.data,
    };
  } catch (error) {
    return error;
  }
};

export const addStockBalance = async (balance, user_id, transactionData) => {
  try {
    const addStockBalanceResponse = await axios.post(
      "http://localhost:3000/add_stock_balance",
      {
        balance,
        user_id,
      }
    );

    const transactionResponse = await axios.post(
      "http://localhost:3000/transactions",
      {
        balance,
        user_id,
        ...transactionData,
      }
    );

    return {
      addBalanceResponse: addStockBalanceResponse.data,
      transactionResponse: transactionResponse.data,
    };
  } catch (error) {
    return error;
  }
};

export const addCryptoBalance = async (balance, user_id, transactionData) => {
  try {
    const addStockBalanceResponse = await axios.post(
      "http://localhost:3000/add_crypto_balance",
      {
        balance,
        user_id,
      }
    );

    const transactionResponse = await axios.post(
      "http://localhost:3000/transactions",
      {
        balance,
        user_id,
        ...transactionData,
      }
    );

    return {
      addBalanceResponse: addStockBalanceResponse.data,
      transactionResponse: transactionResponse.data,
    };
  } catch (error) {
    return error;
  }
};

export const revertStockBalance = async (balance, user_id, transactionData) => {
  try {
    const revertStockBalanceResponse = await axios.post(
      "http://localhost:3000/revert_stock_balance",
      {
        balance,
        user_id,
      }
    );

    const transactionResponse = await axios.post(
      "http://localhost:3000/transactions",
      {
        balance,
        user_id,
        ...transactionData,
      }
    );

    return {
      revertBalanceResponse: revertStockBalanceResponse.data,
      transactionResponse: transactionResponse.data,
    };
  } catch (error) {
    return error;
  }
};

export const revertCryptoBalance = async (balance, user_id, transactionData) => {
  try {
    const revertStockBalanceResponse = await axios.post(
      "http://localhost:3000/revert_crypto_balance",
      {
        balance,
        user_id,
      }
    );

    const transactionResponse = await axios.post(
      "http://localhost:3000/transactions",
      {
        balance,
        user_id,
        ...transactionData,
      }
    );

    return {
      revertBalanceResponse: revertStockBalanceResponse.data,
      transactionResponse: transactionResponse.data,
    };
  } catch (error) {
    return error;
  }
};

export const getTransactions = async (user_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/transactions?user_id=${user_id}`,
      {}
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserStocks = async (user_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/show_user_stocks?user_id=${user_id}`,
      {}
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserCrypto = async (user_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/show_user_crypto?user_id=${user_id}`,
      {}
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProfile = async (user_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/users?user_id=${user_id}`,
      {}
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getUserBalance = async (user_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/balance?user_id=${user_id}`,
      {}
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getStockList = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/stocks_list`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCryptoList = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/crypto_list`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getForexList = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/currency_list`, {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const buyStocks = async (user_id, quantity, price, symbol) => {
  try {
    const buyStocksResponse = await axios.post(
      "http://localhost:3000/buy_stocks",
      {
        user_id,
        quantity,
        price,
        symbol,
      }
    );

    return buyStocksResponse.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const buyCrypto = async (user_id, quantity, price, symbol) => {
  try {
    const buyStocksResponse = await axios.post(
      "http://localhost:3000/buy_crypto",
      {
        user_id,
        quantity,
        price,
        symbol,
      }
    );

    return buyStocksResponse.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};



