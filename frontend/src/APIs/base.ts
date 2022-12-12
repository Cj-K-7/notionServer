class Request {
  //Base Properties
  // private baseURL: string = window.location.origin;
  private baseURL: string = "http://localhost:5000/api";
  private request: XMLHttpRequest = new XMLHttpRequest();
  private onprogress = (event: ProgressEvent<EventTarget>) => {
    if (event.lengthComputable) {
      const progress = (event.loaded / event.total) * 100;
      console.log(progress);
    }
  };
  private onload = async (event: ProgressEvent<EventTarget>) => {
    console.log(this.request.response);
  };
  private onerror = async (event: ProgressEvent<EventTarget>) => {
    console.log("onRequsetError");
  };
  private onabort = async (event: ProgressEvent<EventTarget>) => {
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
    query?: { [key: string]: any },
    responseType?: XMLHttpRequestResponseType
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const GET = "GET" as const;
      let endURL = this.baseURL + (route ? route : "");
      try {
        if (query) Object.entries(query);
        this.request.open(GET, endURL, true);
        if (responseType) this.request.responseType = responseType;
        this.request.send();
        resolve(this.request.response);
      } catch (error) {
        reject(error);
      }
    });
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
