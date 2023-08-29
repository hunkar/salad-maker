/**
 * Request class is created for the request management
 */
class Request {
  url = null;

  constructor(url) {
    this.url = url;
  }

  /**
   * Post data to backend
   *
   * @param {object} data data will be sent
   * @returns
   */
  async post(data) {
    const result = await fetch(this.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      return {
        status: result.status,
        data: await result.json(),
      };
    } else {
      alert("Something went wrong on the request.");

      return {
        status: result.status,
        data: null,
      };
    }
  }

  /**
   * Get data from backend
   *
   * @param {object} data data will be sent
   * @returns
   */
  async get() {
    const result = await fetch(this.url);

    if (result.status === 200) {
      return {
        status: result.status,
        data: await result.json(),
      };
    } else {
      alert("Something went wrong on the request.");

      return {
        status: result.status,
        data: null,
      };
    }
  }

  /**
   * Delete data from backend
   *
   * @param {object} data data will be sent
   * @returns
   */
  async delete(data) {
    const result = await fetch(this.url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      return {
        status: result.status,
        data: await result.json(),
      };
    } else {
      alert("Something went wrong on the request.");

      return {
        status: result.status,
        data: null,
      };
    }
  }
}

export default Request;
