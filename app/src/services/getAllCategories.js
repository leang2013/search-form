import axios from 'axios';
import urls from '../config/urls';

async function getAllCategories() {
  try {
    const res = await axios({
      url: urls.getAllCategories(),
      method: 'get',
      withCredentials: false,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return null;
}

export default getAllCategories;
