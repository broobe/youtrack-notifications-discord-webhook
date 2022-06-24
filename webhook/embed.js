/**
 * Represents an Embed in a Discord webhook message.
 */
 class Embed {
    /**
     * @constructor
     * @param {Author} [author]
     * @param {Body} [body]
     * @param {Field[]} [fields=[]] An array of fields.
     * @param {string} [imageUrl] An image to show on the Embed.
     * @param {string} [thumbnailUrl] A URL pointing to a thumbnail image.
     * @param {Footer} [footer]
     */
	constructor(author, body, fields, imageUrl, thumbnailUrl, footer) {
        this._author = author;
        this._body = body;
        this._fields = fields || [];
        this._imageUrl = imageUrl;
        this._thumbnailUrl = thumbnailUrl;
        this._footer = footer;
	}

    /**
     * @param {Author} author
     */
    set author(author) {this._author = author;}

    /**
     * @param {string} body
     */
    set body(body) {this._body = body;}

    /**
     * @param {Fields[]} fields
     */
    set fields(fields) {this._fields = fields;}

    /**
     * @param {string} imageUrl
     */
    set imageUrl(imageUrl) {this._imageUrl = imageUrl;}

    /**
     * @param {string} thumbnailUrl
     */
    set thumbnailUrl(thumbnailUrl) {this._thumbnailUrl = thumbnailUrl;}

    /**
     * @param {Footer} footer
     */
    set footer(footer) {this._footer = footer;}

    /**
     * Adds a Field to the Embed.
     * @param {Field} field The field to add.
     */
    addField(field) {
        this._fields.push(field);
    }

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {object} Embed as a JSON object.
     */
    toJSON() {
        let obj = this._body ? this._body.toJSON() : {};

        obj.author = this._author;
        if (this._fields.length > 0) obj.fields = this._fields;
        if (this._imageUrl) obj.image = {url: this._imageUrl}; //What on earth Discord?
        if (this._thumbnailUrl) obj.thumbnail = {url: this._thumbnailUrl};
        obj.footer = this._footer;

        return obj;
    }
}

/**
 * Represents the Body of an Embed in a Discord webhook message.
 */
class Body {
    /**
     * @constructor
     * @param {string} [title] The title of the embed.
     * @param {string} [description] A description shown below the title.
     * @param {string} [url] URL of the embed title.
     * @param {string} [color=FFFFFF] The colour of the embed as a hexadecimal colour value (omit the _).
     * @param {string} [timestamp] A timestamp to show on the footer.
     */
    constructor(title, description, url, color, timestamp) {
        this._title = title;
        this._description = description;
        this._url = url;
        this._color = color || "FFFFFF";
        this._timestamp = timestamp;
    }

    /**
     * @param {string} title
     */
    set title(title) {this._title = title;}

    /**
     * @param {string} description
     */
    set description(description) {this._description = description;}

    /**
     * @param {string} url
     */
    set url(url) {this._url = url;}

    /**
     * @param {string} color The colour of the embed as a hexadecimal colour value (omit the _).
     */
    set color(color) {this._color = color;}

    /**
     * @returns {number} The embed colour in decimal.
     */
    get color() {
        return parseInt(this._color, 16);
    }

    /**
     * @param {string} timestamp
     */
    set timestamp(timestamp) {this._timestamp = timestamp;}

    /**
     * Sets the timestamp of the embed to the time this method is called.
     */
    setDateToNow() {
        this._timestamp = new Date().toISOString();
    }

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {object} Body as a JSON object.
     */
    toJSON() {
        return {
            title: this._title,
            description: this._description,
            url: this._url,
            color: this.color,
            timestamp: this._timestamp
        };
    }
}

/**
 * Represents the Author of an Embed in a Discord webhook message.
 */
class Author {
    /**
     * @constructor
     * @param {string} name The name of the Author.
     * @param {string} [url] URL of the Author's name.
     * @param {string} [iconUrl] The icon URL of the Author.
     */
	constructor(name, url, iconUrl) {
        this._name = name;
        this._url = url;
        this._iconUrl = iconUrl;
	}

    /**
     * @param {string} name
     */
    set name(name) {this._name = name;}

    /**
     * @param {string} url
     */
    set url(url) {this._url = url;}

    /**
     * @param {string} iconUrl
     */
    set iconUrl(iconUrl) {this._iconUrl = iconUrl;}

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {object} Author as a JSON string.
     */
    toJSON() {
        return {
            name: this._name,
            url: this._url,
            icon_url: this._iconUrl
        };
    }
}

/**
 * Represents a Field of an Embed in a Discord webhook message.
 */
class Field {
    /**
     * @constructor
     * @param {string} name The name of the field.
     * @param {string} description The description below the field title.
     * @param {string} [isInline] Should the field be displayed inline.
     */
    constructor(name, description, isInline) {
        this._name = name;
        this._description = description;
        this._isInline = isInline;
    }

    /**
     * @param {string} name
     */
    set name(name) {this._name = name;}

    /**
     * @param {string} description
     */
    set description(description) {this._description = description;}

    /**
     * @param {string} isInline
     */
    set isInline(isInline) {this._isInline = isInline;}

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {object} Field as a JSON object.
     */
    toJSON() {
        return {
            name: this._name,
            value: this._description,
            inline: this._isInline
        };
    }
}

/**
 * Represents the Footer of an Embed in a Discord webhook message.
 */
class Footer {
    /**
     * @constructor
     * @param {string} [text] The text shown on the footer.
     * @param {string} [iconUrl] An icon to show on the footer.
     */
    constructor(text, iconUrl) {
        this._text = text;
        this._iconUrl = iconUrl;
    }

    /**
     * @param {string} text
     */
    set text(text) {this._text = text;}

    /**
     * @param {string} iconUrl
     */
    set iconUrl(iconUrl) {this._iconUrl = iconUrl;}

    /**
     * Returns a JSON.stringify friendly object in the format used by Discord.
     * @returns {object} Footer as a JSON object.
     */
    toJSON() {
        return {
            text: this._text,
            icon_url: this._iconUrl,
        };
    }
}

module.exports = {
    Embed,
    Body,
    Author,
    Field,
    Footer
};