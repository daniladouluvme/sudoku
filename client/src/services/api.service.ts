import axios from "axios";

export class ApiService<T> {
  constructor(public readonly defaultUrl: string) {}

  public async get(): Promise<T[]>;
  public async get(id?: string): Promise<T>;
  public async get(id?: string): Promise<T | T[]> {
    const url = id ? `${this.defaultUrl}/${id}` : this.defaultUrl;
    return await axios.get(url).then((res) => res.data);
  }

  public async post(body: Partial<T>): Promise<T> {
    return await axios.post(this.defaultUrl, body).then((res) => res.data);
  }

  public async put(id: string, body: Partial<T>): Promise<T> {
    return await axios
      .put(`${this.defaultUrl}/${id}`, body)
      .then((res) => res.data);
  }

  public async patch(id: string, body: Partial<T>): Promise<T> {
    return await axios
      .patch(`${this.defaultUrl}/${id}`, body)
      .then((res) => res.data);
  }

  public async delete(id: string): Promise<T> {
    return await axios
      .delete(`${this.defaultUrl}/${id}`)
      .then((res) => res.data);
  }
}
