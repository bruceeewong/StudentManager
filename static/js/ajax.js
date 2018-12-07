function my_ajax(method, url, data = '') {
    return new Promise(function (resolve, reject) {

        let xmlRequest = new XMLHttpRequest();
        xmlRequest.onreadystatechange = function () {

            if (xmlRequest.readyState === XMLHttpRequest.DONE) {
                if (xmlRequest.status === 200) {
                    resolve(xmlRequest.responseText);

                } else {
                    reject(new Error("请求错误编号: " + xmlRequest.status));
                }
            }
        };

        if (method === 'GET') {
            xmlRequest.open(method, url, false);
            xmlRequest.send(null);
        }
        if (method === 'POST') {
            xmlRequest.open(method, url, true);
            xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlRequest.send(data);

            console.log(data);
        }
    });
}

function my_serialize(form) {
    var
        parts = [],
        field = null,
        option,
        optValue;

    for (let i = 0, len = form.elements.length; i < len; ++ i) {
        field = form.elements[i];

        console.log(field.toString());
        switch (field) {

            case 'select':
                if (field.name.length) {
                    for (let j = 0, optLen = field.options.length; j < optLen; ++ j) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = '';
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ?
                                    option.value : option.text);
                            } else {
                                optValue = (options.attributes["value"].specified ?
                                    option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
                        }
                    }
                }
                break;

            case undefined:
            case 'file':
            case 'submit':
            case 'reset':
            case 'button':
                break;

            case 'fieldset':
                break;

            case 'radio':
                break;
            case 'checkbox':
                if (!field.checked) {
                    break;
                }
            default:
                if (field.name.length) {
                    if (field.type === 'radio') {
                        if (!field.checked) {
                            break;
                        }
                    }

                    parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
                }
        }
    }

    return parts.join('&');
}