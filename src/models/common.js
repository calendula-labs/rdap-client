class Link {
  constructor({
                value = null,
                rel = null,
                href = null,
                hreflang = null,
                title = null,
                media = null,
                type = null,
              } = {}) {
    this.value = value;
    this.rel = rel;
    this.href = href;
    this.hreflang = hreflang;
    this.title = title;
    this.media = media;
    this.type = type;
  }

  static fromJSON(data = {}) {
    return new Link(data);
  }
}

class Event {
  constructor({ eventAction = null, eventActor = null, eventDate = null, links = [] } = {}) {
    this.eventAction = eventAction;
    this.eventActor = eventActor;
    this.eventDate = eventDate;
    this.links = links.map((link) => Link.fromJSON(link));
  }

  static fromJSON(data = {}) {
    return new Event(data);
  }
}

class Notice {
  constructor({ title = null, description = [], links = [] } = {}) {
    this.title = title;
    this.description = Array.isArray(description) ? description : [];
    this.links = links.map((link) => Link.fromJSON(link));
  }

  static fromJSON(data = {}) {
    return new Notice(data);
  }
}

class Remark {
  constructor({ title = null, description = [], links = [] } = {}) {
    this.title = title;
    this.description = Array.isArray(description) ? description : [];
    this.links = links.map((link) => Link.fromJSON(link));
  }

  static fromJSON(data = {}) {
    return new Remark(data);
  }
}

class RdapCidr {
  constructor({ v4prefix = null, v6prefix = null, length = null } = {}) {
    this.v4prefix = v4prefix;
    this.v6prefix = v6prefix;
    this.length = length;
  }

  static fromJSON(data = {}) {
    return new RdapCidr(data);
  }
}

class RdapVCardProperty {
  constructor({ name = null, parameters = {}, type = null, value = null } = {}) {
    this.name = name;
    this.parameters = parameters;
    this.type = type;
    this.value = value;
  }

  static fromJSON(data = []) {
    const [name = null, parameters = {}, type = null, value = null] = data;
    return new RdapVCardProperty({ name, parameters, type, value });
  }
}

class RdapVCard {
  constructor({ version = null, properties = [] } = {}) {
    this.version = version;
    this.properties = properties;
  }

  static fromJSON(data = []) {
    const [, rawProperties = []] = Array.isArray(data) ? data : [];
    const properties = rawProperties.map((property) => RdapVCardProperty.fromJSON(property));
    const versionProperty = properties.find((property) => property.name === 'version');

    return new RdapVCard({
      version: versionProperty ? versionProperty.value : null,
      properties,
    });
  }
}

module.exports = {
  RdapCidr,
  Event,
  Link,
  Notice,
  Remark,
  RdapVCard,
  RdapVCardProperty,
};
