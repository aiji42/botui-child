const fetchCache = {};
const fetchAPI = async (zip) => {
  if (!/\d{7}/.test(zip)) return null;
  if (fetchCache[zip]) return fetchCache[zip];

  const response = await fetch(
    `https://madefor.github.io/postal-code-api/api/v1/${zip.slice(0, 3)}/${zip.slice(3)}.json`,
    { mode: 'cors' },
  );
  if (!response.ok) {
    fetchCache[zip] = null;
    return fetchCache[zip];
  }
  const json = await response.json();
  fetchCache[zip] = json.data[0];

  return fetchCache[zip];
};

const search = async (zip, paddingZeroPrefCode = false) => {
  const data = await fetchAPI(zip);
  if (!data) return data;

  const {
    prefcode,
    ja: {
      prefecture, address1, address2, address3, address4,
    },
  } = data;

  const collectedPrefcode = prefcode.charAt(0) === '0' && !paddingZeroPrefCode ? prefcode.charAt(1) : prefcode;
  return {
    prefecture,
    prefcode: collectedPrefcode,
    city: address1,
    town: address2,
    street: address3 + address4,
  };
};

const isExisting = async (zip) => {
  const data = await fetchAPI(zip);
  return data !== null;
};

export default { search, isExisting };
