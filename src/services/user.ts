import requestInstance, {RequestInstance} from '../libs/axios';

class UserService {
  constructor(private _req: RequestInstance) {
    this._req = _req;
  }

  getUserInfo() {
    return this._req.get('/users');
  }
}

const userService = new UserService(requestInstance);
export default userService;
