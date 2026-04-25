const {IpNetwork} = require("../models/ip-network");

class RdapClient {
  constructor({ baseUrl, fetchImpl = globalThis.fetch } = {}) {
    this.baseUrl = baseUrl ? baseUrl.replace(/\/$/, '') : 'https://rdap.arin.net/bootstrap';
    this.fetchImpl = fetchImpl;
  }

  buildUrl(path) {
    return `${this.baseUrl}/${path.replace(/^\//, '')}`;
  }

  async getJSON(path) {
    const response = await this.fetchImpl(this.buildUrl(path), {
      headers: {
        accept: 'application/rdap+json, application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`RDAP request failed with status ${response.status}`);
    }

    return response.json();
  }

  async lookupIp(ipAddress) {
    const payload = await this.getJSON(`ip/${encodeURIComponent(ipAddress)}`);
    return IpNetwork.fromJSON(payload);
  }
}

module.exports = {
  RdapClient,
};
