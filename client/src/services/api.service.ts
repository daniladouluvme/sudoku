import axios from "axios";

export class ApiService<T> {
  constructor(public readonly url: string) {}

  public async get(): Promise<T[]>;
  public async get(id?: string): Promise<T>;
  public async get(id?: string): Promise<T | T[]> {
    const url = id ? `${this.url}/${id}` : this.url;
    return await axios.get(url).then((res) => res.data);
  }

  public async post(body: Partial<T>): Promise<T> {
    return await axios.post(this.url, body).then((res) => res.data);
  }

  public async put(body: Partial<T>): Promise<T> {
    return await axios.put(this.url, body).then((res) => res.data);
  }

  public async patch(body: Partial<T>): Promise<T> {
    return await axios.patch(this.url, body).then((res) => res.data);
  }

  public async delete(id: string): Promise<T> {
    return await axios.delete(`${this.url}/${id}`).then((res) => res.data);
  }
}
