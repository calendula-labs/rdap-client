const {
  Event,
  Link,
  Remark,
  RdapVCard,
} = require('./common');

class Entity {
  constructor({
    handle = null,
    objectClassName = null,
    roles = [],
    status = [],
    port43 = null,
    links = [],
    events = [],
    remarks = [],
    entities = [],
    vcard = null,
  } = {}) {
    this.handle = handle;
    this.objectClassName = objectClassName;
    this.roles = Array.isArray(roles) ? roles : [];
    this.status = Array.isArray(status) ? status : [];
    this.port43 = port43;
    this.links = links;
    this.events = events;
    this.remarks = remarks;
    this.entities = entities;
    this.vcard = vcard;
  }

  static fromJSON(data = {}) {
    return new Entity({
      handle: data.handle,
      objectClassName: data.objectClassName,
      roles: data.roles,
      status: data.status,
      port43: data.port43,
      links: Array.isArray(data.links) ? data.links.map((link) => Link.fromJSON(link)) : [],
      events: Array.isArray(data.events) ? data.events.map((event) => Event.fromJSON(event)) : [],
      remarks: Array.isArray(data.remarks) ? data.remarks.map((remark) => Remark.fromJSON(remark)) : [],
      entities: Array.isArray(data.entities) ? data.entities.map((entity) => Entity.fromJSON(entity)) : [],
      vcard: data.vcardArray ? RdapVCard.fromJSON(data.vcardArray) : null,
    });
  }
}

module.exports = {
  Entity,
};
