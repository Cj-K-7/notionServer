class Request {
  //Base Properties
  baseURL: string = window.location.origin;
  request: XMLHttpRequest = new XMLHttpRequest();
  onprogress = (event: ProgressEvent<EventTarget>) => {};
  onload = (event: ProgressEvent<EventTarget>) => {};
  onerror = (event: ProgressEvent<EventTarget>) => {};
  onabort = (event: ProgressEvent<EventTarget>) => {};

  //Constructor
  constructor(baseURL?: string) {
    if (baseURL) this.baseURL = baseURL;
    this.request.onprogress = this.onprogress;
    this.request.onload = this.onload;
    this.request.onerror = this.onerror;
    this.request.onabort = this.onabort;
  }

  //Methods
  async get<T>(
    route?: string,
    param?: { [key: string]: any },
    responseType?: XMLHttpRequestResponseType
  ) {
    const GET = "GET" as const;
    const endURL = this.baseURL + (route ? route : "") + (param ? param : "");
    this.request.open(GET, this.baseURL, true);
    if (responseType) this.request.responseType = responseType;
    return;
  }

  async post<T>() {
    const POST = "POST" as const;
  }

  async put<T>() {
    const PUT = "PUT" as const;
  }

  async delete<T>() {
    const DELETE = "DELETE" as const;
  }
}

export default Request;
