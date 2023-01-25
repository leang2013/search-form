import axios from 'axios';
import urls from '../config/urls';

async function getLocation(search) {
  if (!search) return [];

  try {
    const res = await axios({
      url: urls.getLocation(search),
      method: 'get',
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

export default getLocation;
