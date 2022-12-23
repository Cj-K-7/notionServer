class Request {
  //Base Properties
  private baseURL: string = `${window.location.origin}/api`;
  private endURL: string = this.baseURL;
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
    route: string,
    query?: { [key: string]: any },
    responseType?: XMLHttpRequestResponseType
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        const GET = "GET" as const;

        this.endURL = this.baseURL + (route ? route : "");

        if (responseType) this.request.responseType = responseType;
        if (query) {
          const queryString = Object.entries(query)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
          this.endURL = `${this.endURL}?${queryString}`;
        }

        this.request.open(GET, this.endURL, true);
        this.request.send();

        resolve(this.request.response);
      } catch (error) {
        reject(error);
      }
    });
  }

  async post<T>(
    route: string,
    data: XMLHttpRequestBodyInit,
    responseType?: XMLHttpRequestResponseType
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      try {
        const POST = "POST" as const;
        this.endURL = this.baseURL + (route ? route : "");

        if (responseType) this.request.responseType = responseType;

        this.request.open(POST, this.endURL, true);
        this.request.send(data);
        console.log(POST);

        resolve(this.request.response);
      } catch (error) {
        reject(error);
      }
    });
  }

  async put<T>(route: string) {
    return new Promise<T>((resolve, reject) => {
      try {
        const PUT = "PUT" as const;

        this.endURL = this.baseURL + (route ? route : "");

        this.request.open(PUT, this.endURL, true);
        this.request.send();

        resolve(this.request.response);
      } catch (error) {
        reject(error);
      }
    });
  }

  async delete<T>(route: string) {
    return new Promise<T>((resolve, reject) => {
      try {
        const DELETE = "DELETE" as const;

        this.endURL = this.baseURL + (route ? route : "");

        this.request.open(DELETE, this.endURL, true);
        this.request.send();

        resolve(this.request.response);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Request;
