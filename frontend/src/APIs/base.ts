class Request {
  //Base Properties
  private baseURL: string = window.location.origin;
  private request: XMLHttpRequest = new XMLHttpRequest();
  private onprogress = (event: ProgressEvent<EventTarget>) => {
    if (event.lengthComputable) {
      const progress = (event.loaded / event.total) * 100;
      console.log(progress);
    }
  };
  private onload = (event: ProgressEvent<EventTarget>) => {
    console.log("onRequsetLoad");
  };
  private onerror = (event: ProgressEvent<EventTarget>) => {
    console.log("onRequsetError");
  };
  private onabort = (event: ProgressEvent<EventTarget>) => {
    console.log("onRequsetAbort");
  };

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
  ): Promise<T> {
    const GET = "GET" as const;
    let endURL = this.baseURL + (route ? route : "");
    if (param) Object.entries(param);
    this.request.open(GET, endURL, true);
    if (responseType) this.request.responseType = responseType;
    this.request.send();

    return this.request.response;
  }

  async post<T>() {
    const POST = "POST" as const;
    this.request.open(POST, this.baseURL, true);
  }

  async put<T>() {
    const PUT = "PUT" as const;
    this.request.open(PUT, this.baseURL, true);
  }

  async delete<T>() {
    const DELETE = "DELETE" as const;
    this.request.open(DELETE, this.baseURL, true);
  }
}

export default Request;
