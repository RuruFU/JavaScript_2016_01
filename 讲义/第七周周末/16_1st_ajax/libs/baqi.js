;
(function (global) {
    // ��ֹ�Ͱ汾ie�undefined����д
    var undefined = void(0);
    var x = {};

    var defaultOptions = {
        // ajax�����·����ʲô
        url: '',
        // �����������͵�����
        data: '',
        // ʹ��ʲôhttp����
        type: '',
        // ajax����ʽ��ͬ�������첽��Ĭ��Ϊ�첽
        async: true,
        // �ɹ�ʱִ�еĺ���
        success: function (data) {
        },
        // ʧ��ʱִ�еĺ���
        error: function (errInfo) {
        },
        // �Զ��������ײ��б�
        header: {},
        // ��д��mimeType
        overrideMimeType: '',
        // �Ƿ��߻���
        cache: false,
        // ��ʱ��������Ĭ��Ϊ0 ��ʾ��ִ�г�ʱ�߼�
        timeout: 0,
        // �Ƿ��ʽ������Ϊuri string
        processData: true,
        // �����mime���� Ĭ��Ϊ���ύ
        contentType: 'application/x-www-form-urlencoded',
        // ���ص����ݸ�ʽ text|json
        dataType: 'text'
    };
    var ajax = function (options) {
        // �жϲ����Ƿ�Ϊ��������������׳����ʹ���
        if (!tool.isObject(options)) {
            throw new TypeError('�������ʹ���');
        }
        // �ϲ��û�����Ĳ����б��Ĭ�ϵĲ����б� ����һ��ȫ�µĲ����б����
        var userOptions = tool.extend(defaultOptions, options);

        // ajax��һ������ȡajax����
        var xhr = tool.getXHR();

        // 1�������getϵ ��Ҫ��dataƴ�ӵ�url����
        if (/^(get|delete|head)$/img.test(userOptions.type)) {
            var data = tool.encodeToURIString(userOptions.data);
            userOptions.url = tool.hasSearch(userOptions.url, data);
            // ��Ϊgetϵ����Ҫ��send��������������Ϊnull
            userOptions.data = null;
        }
        // 2���Ƿ��߻��棬������߻�������url�����һ�����������ֹ����
        if (userOptions.cache === false) {
            // ��Ϊsearch���й̶���ʽ�� key=value ���ֻдһ��value�ǲ��Ϸ��ģ����Ա��빹��һ��key���������key���ܺ����е�key�ظ�
            var random = '_=' + (Math.random() * 0xffffff).toFixed(0);
            userOptions.url = tool.hasSearch(userOptions.url, random);
        }
        xhr.open(userOptions.type, userOptions.url, userOptions.async);
        // 2.1 �����Զ��������ײ���Ϣ
        if (tool.isObject(userOptions.header)) {
            tool.eachObject(userOptions.header, function (key, value) {
                xhr.setRequestHeader(key, value);
            })
        }
        // 2.2 ����content-type
        if (userOptions.contentType && tool.isString(userOptions.contentType)) {
            xhr.setRequestHeader('content-type', userOptions.contentType);
        }
        // 2.3 ������д��mime����
        if (userOptions.overrideMimeType && tool.isString(userOptions.overrideMimeType)) {
            xhr.overrideMimeType(userOptions.overrideMimeType);
        }
        // 2.4 �ж��Ƿ�ִ�г�ʱ�߼�
        if (tool.isNumber(userOptions.timeout) && userOptions.timeout > 0) {
            xhr.timeout = userOptions.timeout;
            // ��׼�����
            if ('ontimeout' in xhr) {
                xhr.ontimeout = function () {
                    userOptions.error('timeout');
                }
            } else {
                // �Ͱ汾ie
                setTimeout(function () {
                    // http�������Ƿ�û�����
                    if (xhr.readyState !== 4) {
                        // ǿ����ֹhttp����
                        xhr.abort();
                    }
                }, xhr.timeout);
            }
        }

        // 2.5 �ж�processData�Ƿ�Ϊtrue
        if (/^(post|put$)/igm.test(userOptions.type) && userOptions.processData === true) {
            userOptions.data = tool.encodeToURIString(userOptions.data);
        }
        // ajax������:������Ӧ
        xhr.onreadystatechange = function () {
            // http�������Ƿ����
            if (xhr.readyState === 4) {
                var responseText = xhr.responseText;
                // �ж�״̬���Ƿ�ɹ�
                if (/^2\d{2}$/.test(xhr.status)) {
                    // �ж��Ƿ���Ҫ����Ӧ�����ʽ��Ϊjson����
                    if (userOptions.dataType === 'json') {
                        // ��Ϊ���Ϸ���json�ַ����޷�ת��Ϊjson���󣬻���쳣
                        try {
                            responseText = tool.JSONParse(responseText);
                        } catch (ex) {
                            userOptions.error(ex);
                        }
                    }
                    userOptions.success(responseText);
                    // R�����Ӧ���Ǵ��������
                } else if (/^(4|5)\d{2}$/.test(xhr.status)) {
                    // ֱ��ִ��error
                    userOptions.error(xhr.status);
                }
            }
        };
        // ajax���Ĳ�������
        xhr.send(userOptions.data);
    };
    /**
     * ���ñհ���ʵ�ֻ�ȡ��������
     * @param type
     * @returns {Function}
     */
    var getType = function (type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    };

    var tool = {
        getXHR: (function () {
            var list = [function () {
                return new XMLHttpRequest;
            }, function () {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }, function () {
                return new ActiveXObject("Msxml3.XMLHTTP");
            }];
            var len = list.length;
            var xhr = null;
            while (len--) {
                try {
                    list[len]();
                    xhr = list[len];
                    break;
                } catch (ex) {
                    continue;
                }
            }
            if (xhr !== null) {
                return xhr;
            }
            throw new Error('��ǰ�������֧�ִ˷���');

        })(),
        // �ϲ��������
        extend: function () {
            // ��Ϊ�������Ȳ��̶������԰Ѳ����б�ת������
            var params = [].slice.call(arguments, 0);
            var voidObj = {};
            this.each(params, function (item) {
                // itemΪÿһ������
                tool.eachObject(item, function (key, value) {
                    voidObj[key] = value;
                });
            });
            return voidObj;
        },
        /**
         * ѭ����������
         */
        each: (function () {
            if ([].forEach) {
                return function (list, callback, context) {
                    [].forEach.call(list, callback, context);
                }
            }
            return function (list, callback, context) {
                for (var i = 0, j = list.length; i < j; i++) {
                    callback.call(context, list[i], i, list);
                }
            }
        })(),
        /**
         * ѭ������
         * @param obj
         * @param callback
         */
        eachObject: function (obj, callback, context) {
            for (var n in obj) {
                if (!obj.hasOwnProperty(n)) continue;
                callback.call(context, n, obj[n]);
            }
        },
        /**
         * ��tool��̬����ж��������͵ķ���
         */
        init: function () {
            this.each(['Object', 'Function', 'Array', 'String', 'Number'], function (item) {
                tool['is' + item] = getType(item);
            })
        },
        /**
         * ��һ�������ʽ��Ϊuri string
         * @param data
         * @returns {*}
         */
        encodeToURIString: function (data) {
            if (this.isString(data))  return data;
            if (!this.isObject(data)) return '';
            var arr = [];
            this.eachObject(data, function (key, value) {
                arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            });
            return arr.join('&');
        },
        /**
         * �жϲ�������û���ʺ�
         */
        hasSearch: function (url, padString) {
            if (!padString) return url;
            // ������ʺţ�˵��url���Ѿ��в����ˣ���Ϊ�����Ͳ���֮����&���ָ�
            /*if (/\?/.test(url)) {
             return url + '&' + padString;
             } else {
             return url + '?' + padString;
             }*/
            return url + (/\?/.test(url) ? '&' : '?') + padString;
        },
        JSONParse: function (jsonString) {
            if (window.JSON) {
                return JSON.parse(jsonString)
            }
            return eval('(' + jsonString + ')');
        }
    };
    tool.init();

    x.ajax = ajax;

    x.noConflict = function (symbol) {
        if (symbol && tool.isString(symbol)) {
            window[symbol] = x;
        }
        return x;
    };

    global.x = x;

})(this);

