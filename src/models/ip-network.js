const {
  RdapCidr,
  Event,
  Link,
  Notice,
  Remark,
} = require('./common');
const { Entity } = require('./entity');

class IpNetwork {
  constructor({
    handle = null,
    objectClassName = null,
    name = null,
    ipVersion = null,
    startAddress = null,
    endAddress = null,
    parentHandle = null,
    port43 = null,
    status = [],
    rdapConformance = [],
    arinOriginAutnums = [],
    cidrs = [],
    entities = [],
    events = [],
    links = [],
    notices = [],
    remarks = [],
    raw = null,
  } = {}) {
    this.handle = handle;
    this.objectClassName = objectClassName;
    this.name = name;
    this.ipVersion = ipVersion;
    this.startAddress = startAddress;
    this.endAddress = endAddress;
    this.parentHandle = parentHandle;
    this.port43 = port43;
    this.status = Array.isArray(status) ? status : [];
    this.rdapConformance = Array.isArray(rdapConformance) ? rdapConformance : [];
    this.arinOriginAutnums = Array.isArray(arinOriginAutnums) ? arinOriginAutnums : [];
    this.cidrs = cidrs;
    this.entities = entities;
    this.events = events;
    this.links = links;
    this.notices = notices;
    this.remarks = remarks;
    this.raw = raw;
  }

  static fromJSON(data = {}) {
    return new IpNetwork({
      handle: data.handle,
      objectClassName: data.objectClassName,
      name: data.name,
      ipVersion: data.ipVersion,
      startAddress: data.startAddress,
      endAddress: data.endAddress,
      parentHandle: data.parentHandle,
      port43: data.port43,
      status: data.status,
      rdapConformance: data.rdapConformance,
      arinOriginAutnums: data.arin_originas0_originautnums,
      cidrs: Array.isArray(data.cidr0_cidrs) ? data.cidr0_cidrs.map((cidr) => RdapCidr.fromJSON(cidr)) : [],
      entities: Array.isArray(data.entities) ? data.entities.map((entity) => Entity.fromJSON(entity)) : [],
      events: Array.isArray(data.events) ? data.events.map((event) => Event.fromJSON(event)) : [],
      links: Array.isArray(data.links) ? data.links.map((link) => Link.fromJSON(link)) : [],
      notices: Array.isArray(data.notices) ? data.notices.map((notice) => Notice.fromJSON(notice)) : [],
      remarks: Array.isArray(data.remarks) ? data.remarks.map((remark) => Remark.fromJSON(remark)) : [],
      raw: data,
    });
  }
}

module.exports = {
  IpNetwork,
};
