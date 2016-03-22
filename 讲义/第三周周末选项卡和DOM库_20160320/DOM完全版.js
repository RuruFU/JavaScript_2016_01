
var DOM = {};
/**
 * ���ָ��Ԫ�ص�����
 * @param ele ָ��Ԫ��
 * @returns {number} ����
 */
DOM.getIndex = function getIndex(ele) {
    var index = 0;
    var p = ele.previousSibling;
    while (p) {
        if (p.nodeType === 1) {
            index++;
        }
        p = p.previousSibling;
    }
    return index;
};

/**
 * ��������Ԫ�ؾ����ĵ��ϱߺ���ߵľ���ƫ����
 * @param ele
 * @returns {{t: (*|Number|number)�����ϱߵ�ƫ����, l: (*|Number|number)������ߵ�ƫ����}}
 */
DOM.offset = function offset(ele) {
    var top = ele.offsetTop;
    var left = ele.offsetLeft;
    var parent = ele.offsetParent;
    while (parent) {
        if (window.navigator.userAgent("MSIE 8") == -1) {
            top += parent.offsetTop + parent.clientTo
            p;
            left += parent.offsetLeft + parent.clientLeft
        } else {
            top += parent.offsetTop;
            left += parent.offsetLeft;
        }
    }
    return {t: top, l: left};
};
/**
 * ������ת��Ϊ����
 * @param likeArray ������
 * @returns {Array} ����
 */
DOM.listToArray = function listToArray(likeArray) {
    try {
        return [].slice.call(likeArray);
    } catch (e) {
        var ary = [];
        for (var i = 0; i < likeArray; i++) {
            ary[ary.length] = likeArray[i];
        }
        return ary;
    }
};

/**
 * ���ָ��Ԫ�ص����е�Ԫ�ظ��ܵܽڵ�
 * @param ele ָ��Ԫ��
 * @returns {Array} ���ܵܣ�˳����ĵ�˳����ͬ
 */
DOM.siblingAll = function siblingAll(ele) {
    var parent = ele.parentNode;
    var children = parent.children;//����Ԫ�ؽڵ㣬��ie�л������ע�ͽڵ�
    var ary = [];
    for (var i = 0; i < children.length; i++) {
        if (children[i].nodeType === 1 && children[i] != ele) {
            ary.push(children[i]);
        }
    }
    return ary;

    /*������
     var ary=[];
     var p=ele.previousSibling;
     while (p){
     if(p.nodeType===-1){
     ary[ary.length]=p;
     }
     p= p.previousSibling;
     }
     var next=ele.nextSibling;
     while (next){
     if(next.nodeType===-1){
     ary[ary.length]=next;
     }
     next= next.nextSibling;
     }
     return ary.reverse();//���ary��˳���Ƿ��ģ�����Ҫreverse
     */
};
/**
 * ���ָ��Ԫ�����ڵĸ��Ԫ�ؽڵ�
 * @param ele ָ��Ԫ��
 * @returns {Object} Ԫ�ؽڵ�
 */
DOM.previous = function previous(ele) {
    if (typeof ele.previousElementSibling == "object") {//���û�и��Ԫ�ؽڵ㣬����֧���������  if��ֱ��д ele.previousElementSibling��������
        return ele.previousElementSibling;
    } else {
        var p = ele.previousSibling;
        while (p) {
            if (p.nodeType === 1) {
                return p;
            }
            p = p.previousSibling;
        }
        return null;//���û�и��ڵ㣬����null
    }
};
/**
 * ���ָ��Ԫ�����ڵĵܵ�Ԫ�ؽڵ�
 * @param ele ָ��Ԫ��
 * @returns {Object}
 */
DOM.next = function next(ele) {
    if (typeof ele.nextElementSibling == "object") {
        return ele.nextElementSibling;
    }
    var next = ele.nextSibling;
    while (next) {
        if (next.nodeType === 1) {
            return next;
        }
        next = next.nextSibling;
    }
    return null;
};
/**
 * ���ָ��Ԫ�����еĸ��Ԫ�ؽڵ�
 * @param ele ָ��Ԫ��
 * @returns {Array} ���Ԫ�ؽڵ�����
 */
DOM.previousAll = function previousAll(ele) {
    var ary = [];
    var p = ele.previousSibling;
    while (p) {
        if (p.nodeType === 1) {
            ary.push(p);
        }
        p = p.previousSibling;
    }
    return ary;
};
/**
 * ���ָ��Ԫ�����еĵܵ�Ԫ�ؽڵ�
 * @param ele ָ��Ԫ��
 * @returns {Array} �ܵ�Ԫ�ؽڵ�����
 */
DOM.nextAll = function nextAll(ele) {
    var ary = [];
    var next = ele.nextSibling;
    while (next) {
        if (next.nodeType === 1) {
            ary.push(next);
        }
        next = next.previousSibling;
    }
    return ary;
};
/**
 * ���ָ��Ԫ�صĵ�һ��Ԫ���ӽڵ�
 * @param parent ָ��Ԫ��
 * @returns {Object} Ԫ�ؽڵ�
 */
DOM.firstElementChild = function firstElementChild(parent) {
    if (typeof parent.firstElementChild == "object") {
        return parent.firstElementChild;
    }
    var first = parent.firstChild;
    while (first) {
        if (first.nodeType === 1) {
            return first;
        }
        first = first.nextSibling;
    }
    return null;
};
/**
 * ���ָ��Ԫ�ص����һ��Ԫ���ӽڵ�
 * @param parent ָ��Ԫ��
 * @returns {Object} Ԫ�ؽڵ�
 */
DOM.lastElementChild = function lastElementChild(parent) {
    if (typeof parent.lastElementChild == "object") {
        return parent.lastElementChild;
    }
    var last = parent.lastChild;
    while (last) {
        if (last.nodeType === 1) {
            return last;
        }
        last = last.previousSibling;
    }
    return null;
};
/*
 ���parent���е���Ԫ�ؽڵ�,����ie
 �����Ի��ָ����ǩ��tagName����Ԫ��
 */
/**
 * ���ָ��Ԫ�����е�ָ����Ԫ�ؽڵ�
 * @param parent ��Ԫ��
 * @param tagName ��Ԫ�ص�����
 * @returns {Array} ����
 */
DOM.childAll = function childAll(parent, tagName) {
    var ary = [];
    var child = parent.children;//children��ie67�л����ע�ͽڵ�
    if (typeof tagName == "string") {
        for (var i = 0; i < child.length; i++) {
            //if(child[i].nodeType===1&&child[i].nodeName==tagName.toUpperCase()){
            //if(child[i].nodeType===1&&child[i].tagName==tagName.toUpperCase()){nodeName��tagName��tagNameֻ��Ԫ�ؽڵ�����ԣ������ڵ���undefined����nodeName�����еĽڵ�
            if (child[i].tagName === tagName.toUpperCase()) {
                ary.push(child[i]);
            }
        }
    } else if (tagName === undefined) {
        for (var i = 0; i < child.length; i++) {
            if (child[i].nodeType === 1) {
                ary.push(child[i]);
            }
        }
    } else {
        throw new Error("�ڶ���������ǩ������");
    }
    return ary;
};
/**
 * �����������Ԫ��
 * @param className  �������ַ�������������Կո�ָ�
 * @param parent  ���������Բ�д����дΪ�����ĵ�
 * @returns {Array} ����
 */
DOM.getByClassName = function getByClassName(className, parent) {
    parent = parent || document;
    if (parent.getElementsByClassName) {
        return parent.getElementsByClassName(className);
    }
    var regTrim = /^ +| +$/g;
    className = className.replace(regTrim, "");
    var allTag = parent.getElementsByTagName("*");
    var classNameAry = className.split(/ +/);
    for (var i = 0; i < classNameAry.length; i++) {
        var reg = new RegExp("(?:^| )" + classNameAry[i] + "(?: |$)");
        var ary = [];
        for (var k = 0; k < allTag.length; k++) {
            if (reg.test(allTag[k].className)) {
                ary.push(allTag[k]);
            }
        }
        allTag = ary;
    }
    return allTag;
};
/**
 * ����class����
 * @param ele Ԫ��
 * @param className Ҫ����������
 */
DOM.addClass = function addClass(ele, className) {
    if (ele && ele.nodeType && ele.nodeType === 1 && className && typeof className === "string") {
        var reg = new RegExp("(?:^| )" + className + "(?: |$)");
        if (!reg.test(ele.className)) {
            ele.className = ele.className + " " + className;
        }
    }
};
/**
 * �Ƴ�class����
 * @param ele Ԫ��
 * @param className Ҫ�Ƴ�������
 */
DOM.removeClass = function removeClass(ele, className) {
    if (ele && ele.nodeType && ele.nodeType === 1 && className && typeof className === "string") {
        var reg = new RegExp("(?:^| )" + className + "(?: |$)", "g");
        var temp = ele.className.replace(/ /g, "   ");//�ӿո�
        ele.className = temp.replace(reg, " ");
    }
};
/**
 * ����Ԫ����ӵ���Ԫ�غ��
 * @param newEle ��Ԫ��
 * @param oldEle ��Ԫ��
 */
DOM.insetAfter = function insetAfter(newEle, oldEle) {
    //ele.insertBefore(newEle,oldEle);//����ڶ�������Ϊnull�����߲�д���൱��appendChild
    //��newEle��ӵ�oldEle�ĵܵܵ�ǰ��
    oldEle.parentNode.insertBefore(newEle, oldEle.nextSibling);
};
/**
 * ����Ԫ����ӵ���Ԫ�صĵ�һ��λ��
 * @param parent ��Ԫ��
 * @param child ��Ԫ��
 */
DOM.prepend = function prepend(parent, child) {
    //appendChile�������
    parent.insertBefore(child, parent.firstChild);
};

