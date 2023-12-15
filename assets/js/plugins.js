! function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = t()
}(this, function () {
  "use strict";
  const D = "transitionend",
    N = e => e = e && window.CSS && window.CSS.escape ? e.replace(/#([^\s"#']+)/g, (e, t) => "#" + CSS.escape(t)) : e,
    j = e => {
      e.dispatchEvent(new Event(D))
    },
    r = e => !(!e || "object" != typeof e) && void 0 !== (e = void 0 !== e.jquery ? e[0] : e).nodeType,
    s = e => r(e) ? e.jquery ? e[0] : e : "string" == typeof e && 0 < e.length ? document.querySelector(N(e)) : null,
    n = e => {
      if (!r(e) || 0 === e.getClientRects().length) return !1;
      const t = "visible" === getComputedStyle(e).getPropertyValue("visibility"),
        i = e.closest("details:not([open])");
      if (i && i !== e) {
        const t = e.closest("summary");
        if (t && t.parentNode !== i) return !1;
        if (null === t) return !1
      }
      return t
    },
    a = e => !e || e.nodeType !== Node.ELEMENT_NODE || !!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")),
    H = e => {
      var t;
      return document.documentElement.attachShadow ? "function" == typeof e.getRootNode ? (t = e.getRootNode()) instanceof ShadowRoot ? t : null : e instanceof ShadowRoot ? e : e.parentNode ? H(e.parentNode) : null : null
    },
    B = () => {},
    q = e => {
      e.offsetHeight
    },
    X = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
    Y = [],
    o = () => "rtl" === document.documentElement.dir,
    e = s => {
      var e = () => {
        const e = X();
        if (e) {
          const t = s.NAME,
            i = e.fn[t];
          e.fn[t] = s.jQueryInterface, e.fn[t].Constructor = s, e.fn[t].noConflict = () => (e.fn[t] = i, s.jQueryInterface)
        }
      };
      "loading" === document.readyState ? (Y.length || document.addEventListener("DOMContentLoaded", () => {
        for (const e of Y) e()
      }), Y.push(e)) : e()
    },
    l = (e, t = [], i = e) => "function" == typeof e ? e(...t) : i,
    W = (i, n, e = !0) => {
      if (e) {
        e = (() => {
          if (!n) return 0;
          let {
            transitionDuration: e,
            transitionDelay: t
          } = window.getComputedStyle(n);
          var i = Number.parseFloat(e),
            s = Number.parseFloat(t);
          return i || s ? (e = e.split(",")[0], t = t.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(t))) : 0
        })() + 5;
        let t = !1;
        const s = ({
          target: e
        }) => {
          e === n && (t = !0, n.removeEventListener(D, s), l(i))
        };
        n.addEventListener(D, s), setTimeout(() => {
          t || j(n)
        }, e)
      } else l(i)
    },
    F = (e, t, i, s) => {
      var n = e.length;
      let a = e.indexOf(t);
      return -1 === a ? !i && s ? e[n - 1] : e[0] : (a += i ? 1 : -1, s && (a = (a + n) % n), e[Math.max(0, Math.min(a, n - 1))])
    },
    R = /[^.]*(?=\..*)\.|.*/,
    V = /\..*/,
    G = /::\d+$/,
    U = {};
  let K = 1;
  const Q = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    },
    Z = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

  function J(e, t) {
    return t && t + "::" + K++ || e.uidEvent || K++
  }

  function ee(e) {
    var t = J(e);
    return e.uidEvent = t, U[t] = U[t] || {}, U[t]
  }

  function te(e, t, i = null) {
    return Object.values(e).find(e => e.callable === t && e.delegationSelector === i)
  }

  function ie(e, t, i) {
    var s = "string" == typeof t,
      t = !s && t || i;
    let n = ae(e);
    return [s, t, n = Z.has(n) ? n : e]
  }

  function se(s, n, a, r, o) {
    if ("string" == typeof n && s) {
      let [e, t, i] = ie(n, a, r);
      if (n in Q) {
        const s = t => function (e) {
          if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
        };
        t = s(t)
      }
      var r = ee(s),
        r = r[i] || (r[i] = {}),
        l = te(r, t, e ? a : null);
      if (l) return l.oneOff = l.oneOff && o;
      var d, c, h, p, u, l = J(t, n.replace(R, "")),
        n = e ? (h = s, p = a, u = t, function t(i) {
          var s = h.querySelectorAll(p);
          for (let e = i["target"]; e && e !== this; e = e.parentNode)
            for (const n of s)
              if (n === e) return re(i, {
                delegateTarget: e
              }), t.oneOff && f.off(h, i.type, p, u), u.apply(e, [i])
        }) : (d = s, c = t, function e(t) {
          return re(t, {
            delegateTarget: d
          }), e.oneOff && f.off(d, t.type, c), c.apply(d, [t])
        });
      n.delegationSelector = e ? a : null, n.callable = t, n.oneOff = o, r[n.uidEvent = l] = n, s.addEventListener(i, n, e)
    }
  }

  function ne(e, t, i, s, n) {
    s = te(t[i], s, n);
    s && (e.removeEventListener(i, s, Boolean(n)), delete t[i][s.uidEvent])
  }

  function ae(e) {
    return e = e.replace(V, ""), Q[e] || e
  }
  const f = {
    on(e, t, i, s) {
      se(e, t, i, s, !1)
    },
    one(e, t, i, s) {
      se(e, t, i, s, !0)
    },
    off(e, t, i, s) {
      if ("string" == typeof t && e) {
        const [h, p, u] = ie(t, i, s), f = u !== t, m = ee(e), g = m[u] || {}, v = t.startsWith(".");
        if (void 0 === p) {
          if (v)
            for (const i of Object.keys(m)) {
              n = void 0;
              a = void 0;
              r = void 0;
              o = void 0;
              c = void 0;
              l = void 0;
              d = void 0;
              var n = e;
              var a = m;
              var r = i;
              var o = t.slice(1);
              var l, d, c = a[r] || {};
              for ([l, d] of Object.entries(c)) l.includes(o) && ne(n, a, r, d.callable, d.delegationSelector)
            }
          for (const [i, s] of Object.entries(g)) {
            const h = i.replace(G, "");
            f && !t.includes(h) || ne(e, m, u, s.callable, s.delegationSelector)
          }
        } else Object.keys(g).length && ne(e, m, u, p, h ? i : null)
      }
    },
    trigger(e, t, i) {
      if ("string" != typeof t || !e) return null;
      var s = X();
      let n = null,
        a = !0,
        r = !0,
        o = !1;
      t !== ae(t) && s && (n = s.Event(t, i), s(e).trigger(n), a = !n.isPropagationStopped(), r = !n.isImmediatePropagationStopped(), o = n.isDefaultPrevented());
      s = re(s = new Event(t, {
        bubbles: a,
        cancelable: !0
      }), i);
      return o && s.preventDefault(), r && e.dispatchEvent(s), s.defaultPrevented && n && n.preventDefault(), s
    }
  };

  function re(e, t = {}) {
    for (const [i, s] of Object.entries(t)) try {
      e[i] = s
    } catch (t) {
      Object.defineProperty(e, i, {
        configurable: !0,
        get: () => s
      })
    }
    return e
  }
  const d = new Map,
    oe = {
      set(e, t, i) {
        d.has(e) || d.set(e, new Map);
        e = d.get(e);
        e.has(t) || 0 === e.size ? e.set(t, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(e.keys())[0]}.`)
      },
      get: (e, t) => d.has(e) && d.get(e).get(t) || null,
      remove(e, t) {
        var i;
        d.has(e) && ((i = d.get(e)).delete(t), 0 === i.size) && d.delete(e)
      }
    };

  function le(t) {
    if ("true" === t) return !0;
    if ("false" === t) return !1;
    if (t === Number(t).toString()) return Number(t);
    if ("" === t || "null" === t) return null;
    if ("string" != typeof t) return t;
    try {
      return JSON.parse(decodeURIComponent(t))
    } catch (e) {
      return t
    }
  }

  function de(e) {
    return e.replace(/[A-Z]/g, e => "-" + e.toLowerCase())
  }
  const c = {
    setDataAttribute(e, t, i) {
      e.setAttribute("data-bs-" + de(t), i)
    },
    removeDataAttribute(e, t) {
      e.removeAttribute("data-bs-" + de(t))
    },
    getDataAttributes(t) {
      if (!t) return {};
      var i = {};
      for (const s of Object.keys(t.dataset).filter(e => e.startsWith("bs") && !e.startsWith("bsConfig"))) {
        let e = s.replace(/^bs/, "");
        i[e = e.charAt(0).toLowerCase() + e.slice(1, e.length)] = le(t.dataset[s])
      }
      return i
    },
    getDataAttribute: (e, t) => le(e.getAttribute("data-bs-" + de(t)))
  };
  class ce {
    static get Default() {
      return {}
    }
    static get DefaultType() {
      return {}
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!')
    }
    _getConfig(e) {
      return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
    }
    _configAfterMerge(e) {
      return e
    }
    _mergeConfigObj(e, t) {
      var i = r(t) ? c.getDataAttribute(t, "config") : {};
      return {
        ...this.constructor.Default,
        ..."object" == typeof i ? i : {},
        ...r(t) ? c.getDataAttributes(t) : {},
        ..."object" == typeof e ? e : {}
      }
    }
    _typeCheckConfig(e, t = this.constructor.DefaultType) {
      for (var [i, s] of Object.entries(t)) {
        const t = e[i],
          a = r(t) ? "element" : null == (n = t) ? "" + n : Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase();
        if (!new RegExp(s).test(a)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${a}" but expected type "${s}".`)
      }
      var n
    }
  }
  class t extends ce {
    constructor(e, t) {
      super(), (e = s(e)) && (this._element = e, this._config = this._getConfig(t), oe.set(this._element, this.constructor.DATA_KEY, this))
    }
    dispose() {
      oe.remove(this._element, this.constructor.DATA_KEY), f.off(this._element, this.constructor.EVENT_KEY);
      for (const e of Object.getOwnPropertyNames(this)) this[e] = null
    }
    _queueCallback(e, t, i = !0) {
      W(e, t, i)
    }
    _getConfig(e) {
      return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
    }
    static getInstance(e) {
      return oe.get(s(e), this.DATA_KEY)
    }
    static getOrCreateInstance(e, t = {}) {
      return this.getInstance(e) || new this(e, "object" == typeof t ? t : null)
    }
    static get VERSION() {
      return "5.3.0-alpha1"
    }
    static get DATA_KEY() {
      return "bs." + this.NAME
    }
    static get EVENT_KEY() {
      return "." + this.DATA_KEY
    }
    static eventName(e) {
      return "" + e + this.EVENT_KEY
    }
  }
  const he = t => {
      let i = t.getAttribute("data-bs-target");
      if (!i || "#" === i) {
        let e = t.getAttribute("href");
        if (!e || !e.includes("#") && !e.startsWith(".")) return null;
        e.includes("#") && !e.startsWith("#") && (e = "#" + e.split("#")[1]), i = e && "#" !== e ? e.trim() : null
      }
      return N(i)
    },
    h = {
      find: (e, t = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
      findOne: (e, t = document.documentElement) => Element.prototype.querySelector.call(t, e),
      children: (e, t) => [].concat(...e.children).filter(e => e.matches(t)),
      parents(e, t) {
        var i = [];
        let s = e.parentNode.closest(t);
        for (; s;) i.push(s), s = s.parentNode.closest(t);
        return i
      },
      prev(e, t) {
        let i = e.previousElementSibling;
        for (; i;) {
          if (i.matches(t)) return [i];
          i = i.previousElementSibling
        }
        return []
      },
      next(e, t) {
        let i = e.nextElementSibling;
        for (; i;) {
          if (i.matches(t)) return [i];
          i = i.nextElementSibling
        }
        return []
      },
      focusableChildren(e) {
        var t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(e => e + ':not([tabindex^="-"])').join(",");
        return this.find(t, e).filter(e => !a(e) && n(e))
      },
      getSelectorFromElement(e) {
        e = he(e);
        return e && h.findOne(e) ? e : null
      },
      getElementFromSelector(e) {
        e = he(e);
        return e ? h.findOne(e) : null
      },
      getMultipleElementsFromSelector(e) {
        e = he(e);
        return e ? h.find(e) : []
      }
    },
    pe = (t, i = "hide") => {
      const e = "click.dismiss" + t.EVENT_KEY,
        s = t.NAME;
      f.on(document, e, `[data-bs-dismiss="${s}"]`, function (e) {
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), a(this) || (e = h.getElementFromSelector(this) || this.closest("." + s), t.getOrCreateInstance(e)[i]())
      })
    };
  class ue extends t {
    static get NAME() {
      return "alert"
    }
    close() {
      var e;
      f.trigger(this._element, "close.bs.alert").defaultPrevented || (this._element.classList.remove("show"), e = this._element.classList.contains("fade"), this._queueCallback(() => this._destroyElement(), this._element, e))
    }
    _destroyElement() {
      this._element.remove(), f.trigger(this._element, "closed.bs.alert"), this.dispose()
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = ue.getOrCreateInstance(this);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
          e[t](this)
        }
      })
    }
  }
  pe(ue, "close"), e(ue);
  const fe = '[data-bs-toggle="button"]';
  class me extends t {
    static get NAME() {
      return "button"
    }
    toggle() {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = me.getOrCreateInstance(this);
        "toggle" === t && e[t]()
      })
    }
  }
  f.on(document, "click.bs.button.data-api", fe, e => {
    e.preventDefault();
    e = e.target.closest(fe);
    me.getOrCreateInstance(e).toggle()
  }), e(me);
  const ge = {
      endCallback: null,
      leftCallback: null,
      rightCallback: null
    },
    ve = {
      endCallback: "(function|null)",
      leftCallback: "(function|null)",
      rightCallback: "(function|null)"
    };
  class be extends ce {
    constructor(e, t) {
      super(), (this._element = e) && be.isSupported() && (this._config = this._getConfig(t), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents())
    }
    static get Default() {
      return ge
    }
    static get DefaultType() {
      return ve
    }
    static get NAME() {
      return "swipe"
    }
    dispose() {
      f.off(this._element, ".bs.swipe")
    }
    _start(e) {
      this._supportPointerEvents ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX) : this._deltaX = e.touches[0].clientX
    }
    _end(e) {
      this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), l(this._config.endCallback)
    }
    _move(e) {
      this._deltaX = e.touches && 1 < e.touches.length ? 0 : e.touches[0].clientX - this._deltaX
    }
    _handleSwipe() {
      var e = Math.abs(this._deltaX);
      e <= 40 || (e = e / this._deltaX, this._deltaX = 0, e && l(0 < e ? this._config.rightCallback : this._config.leftCallback))
    }
    _initEvents() {
      this._supportPointerEvents ? (f.on(this._element, "pointerdown.bs.swipe", e => this._start(e)), f.on(this._element, "pointerup.bs.swipe", e => this._end(e)), this._element.classList.add("pointer-event")) : (f.on(this._element, "touchstart.bs.swipe", e => this._start(e)), f.on(this._element, "touchmove.bs.swipe", e => this._move(e)), f.on(this._element, "touchend.bs.swipe", e => this._end(e)))
    }
    _eventIsPointerPenTouch(e) {
      return this._supportPointerEvents && ("pen" === e.pointerType || "touch" === e.pointerType)
    }
    static isSupported() {
      return "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints
    }
  }
  const ye = "next",
    p = "prev",
    i = "left",
    we = "right",
    xe = "slid.bs.carousel",
    _e = "carousel",
    Ee = "active",
    Te = {
      ArrowLeft: we,
      ArrowRight: i
    },
    Ce = {
      interval: 5e3,
      keyboard: !0,
      pause: "hover",
      ride: !1,
      touch: !0,
      wrap: !0
    },
    Se = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      pause: "(string|boolean)",
      ride: "(boolean|string)",
      touch: "boolean",
      wrap: "boolean"
    };
  class Me extends t {
    constructor(e, t) {
      super(e, t), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = h.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === _e && this.cycle()
    }
    static get Default() {
      return Ce
    }
    static get DefaultType() {
      return Se
    }
    static get NAME() {
      return "carousel"
    }
    next() {
      this._slide(ye)
    }
    nextWhenVisible() {
      !document.hidden && n(this._element) && this.next()
    }
    prev() {
      this._slide(p)
    }
    pause() {
      this._isSliding && j(this._element), this._clearInterval()
    }
    cycle() {
      this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval)
    }
    _maybeEnableCycle() {
      this._config.ride && (this._isSliding ? f.one(this._element, xe, () => this.cycle()) : this.cycle())
    }
    to(e) {
      var t, i = this._getItems();
      e > i.length - 1 || e < 0 || (this._isSliding ? f.one(this._element, xe, () => this.to(e)) : (t = this._getItemIndex(this._getActive())) !== e && (t = t < e ? ye : p, this._slide(t, i[e])))
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
    }
    _configAfterMerge(e) {
      return e.defaultInterval = e.interval, e
    }
    _addEventListeners() {
      this._config.keyboard && f.on(this._element, "keydown.bs.carousel", e => this._keydown(e)), "hover" === this._config.pause && (f.on(this._element, "mouseenter.bs.carousel", () => this.pause()), f.on(this._element, "mouseleave.bs.carousel", () => this._maybeEnableCycle())), this._config.touch && be.isSupported() && this._addTouchEventListeners()
    }
    _addTouchEventListeners() {
      for (const e of h.find(".carousel-item img", this._element)) f.on(e, "dragstart.bs.carousel", e => e.preventDefault());
      const e = {
        leftCallback: () => this._slide(this._directionToOrder(i)),
        rightCallback: () => this._slide(this._directionToOrder(we)),
        endCallback: () => {
          "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval))
        }
      };
      this._swipeHelper = new be(this._element, e)
    }
    _keydown(e) {
      var t;
      /input|textarea/i.test(e.target.tagName) || (t = Te[e.key]) && (e.preventDefault(), this._slide(this._directionToOrder(t)))
    }
    _getItemIndex(e) {
      return this._getItems().indexOf(e)
    }
    _setActiveIndicatorElement(e) {
      var t;
      this._indicatorsElement && ((t = h.findOne(".active", this._indicatorsElement)).classList.remove(Ee), t.removeAttribute("aria-current"), t = h.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement)) && (t.classList.add(Ee), t.setAttribute("aria-current", "true"))
    }
    _updateInterval() {
      var e = this._activeElement || this._getActive();
      e && (e = Number.parseInt(e.getAttribute("data-bs-interval"), 10), this._config.interval = e || this._config.defaultInterval)
    }
    _slide(t, e = null) {
      if (!this._isSliding) {
        const i = this._getActive(),
          s = t === ye,
          n = e || F(this._getItems(), i, s, this._config.wrap);
        if (n !== i) {
          const a = this._getItemIndex(n),
            r = e => f.trigger(this._element, e, {
              relatedTarget: n,
              direction: this._orderToDirection(t),
              from: this._getItemIndex(i),
              to: a
            });
          if (!r("slide.bs.carousel").defaultPrevented && i && n) {
            e = Boolean(this._interval);
            this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(a), this._activeElement = n;
            const o = s ? "carousel-item-start" : "carousel-item-end",
              l = s ? "carousel-item-next" : "carousel-item-prev";
            n.classList.add(l), q(n), i.classList.add(o), n.classList.add(o), this._queueCallback(() => {
              n.classList.remove(o, l), n.classList.add(Ee), i.classList.remove(Ee, l, o), this._isSliding = !1, r(xe)
            }, i, this._isAnimated()), e && this.cycle()
          }
        }
      }
    }
    _isAnimated() {
      return this._element.classList.contains("slide")
    }
    _getActive() {
      return h.findOne(".active.carousel-item", this._element)
    }
    _getItems() {
      return h.find(".carousel-item", this._element)
    }
    _clearInterval() {
      this._interval && (clearInterval(this._interval), this._interval = null)
    }
    _directionToOrder(e) {
      return o() ? e === i ? p : ye : e === i ? ye : p
    }
    _orderToDirection(e) {
      return o() ? e === p ? i : we : e === p ? we : i
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = Me.getOrCreateInstance(this, t);
        if ("number" != typeof t) {
          if ("string" == typeof t) {
            if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
            e[t]()
          }
        } else e.to(t)
      })
    }
  }
  f.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", function (e) {
    var t = h.getElementFromSelector(this);
    t && t.classList.contains(_e) && (e.preventDefault(), e = Me.getOrCreateInstance(t), (t = this.getAttribute("data-bs-slide-to")) ? e.to(t) : "next" === c.getDataAttribute(this, "slide") ? e.next() : e.prev(), e._maybeEnableCycle())
  }), f.on(window, "load.bs.carousel.data-api", () => {
    for (const e of h.find('[data-bs-ride="carousel"]')) Me.getOrCreateInstance(e)
  }), e(Me);
  const ke = "show",
    Ae = "collapse",
    Oe = "collapsing",
    Pe = '[data-bs-toggle="collapse"]',
    Le = {
      parent: null,
      toggle: !0
    },
    $e = {
      parent: "(null|element)",
      toggle: "boolean"
    };
  class Ie extends t {
    constructor(e, t) {
      super(e, t), this._isTransitioning = !1, this._triggerArray = [];
      const i = h.find(Pe);
      for (const e of i) {
        const t = h.getSelectorFromElement(e),
          i = h.find(t).filter(e => e === this._element);
        null !== t && i.length && this._triggerArray.push(e)
      }
      this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
    }
    static get Default() {
      return Le
    }
    static get DefaultType() {
      return $e
    }
    static get NAME() {
      return "collapse"
    }
    toggle() {
      this._isShown() ? this.hide() : this.show()
    }
    show() {
      if (!this._isTransitioning && !this._isShown()) {
        let e = [];
        if (!((e = this._config.parent ? this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(e => e !== this._element).map(e => Ie.getOrCreateInstance(e, {
            toggle: !1
          })) : e).length && e[0]._isTransitioning || f.trigger(this._element, "show.bs.collapse").defaultPrevented)) {
          for (const i of e) i.hide();
          const i = this._getDimension();
          this._element.classList.remove(Ae), this._element.classList.add(Oe), this._element.style[i] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
          var t = "scroll" + (i[0].toUpperCase() + i.slice(1));
          this._queueCallback(() => {
            this._isTransitioning = !1, this._element.classList.remove(Oe), this._element.classList.add(Ae, ke), this._element.style[i] = "", f.trigger(this._element, "shown.bs.collapse")
          }, this._element, !0), this._element.style[i] = this._element[t] + "px"
        }
      }
    }
    hide() {
      if (!this._isTransitioning && this._isShown() && !f.trigger(this._element, "hide.bs.collapse").defaultPrevented) {
        const t = this._getDimension();
        this._element.style[t] = this._element.getBoundingClientRect()[t] + "px", q(this._element), this._element.classList.add(Oe), this._element.classList.remove(Ae, ke);
        for (const t of this._triggerArray) {
          var e = h.getElementFromSelector(t);
          e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1)
        }
        this._isTransitioning = !0, this._element.style[t] = "", this._queueCallback(() => {
          this._isTransitioning = !1, this._element.classList.remove(Oe), this._element.classList.add(Ae), f.trigger(this._element, "hidden.bs.collapse")
        }, this._element, !0)
      }
    }
    _isShown(e = this._element) {
      return e.classList.contains(ke)
    }
    _configAfterMerge(e) {
      return e.toggle = Boolean(e.toggle), e.parent = s(e.parent), e
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
    }
    _initializeChildren() {
      if (this._config.parent) {
        const e = this._getFirstLevelChildren(Pe);
        for (const t of e) {
          const e = h.getElementFromSelector(t);
          e && this._addAriaAndCollapsedClass([t], this._isShown(e))
        }
      }
    }
    _getFirstLevelChildren(e) {
      const t = h.find(":scope .collapse .collapse", this._config.parent);
      return h.find(e, this._config.parent).filter(e => !t.includes(e))
    }
    _addAriaAndCollapsedClass(e, t) {
      if (e.length)
        for (const i of e) i.classList.toggle("collapsed", !t), i.setAttribute("aria-expanded", t)
    }
    static jQueryInterface(t) {
      const i = {};
      return "string" == typeof t && /show|hide/.test(t) && (i.toggle = !1), this.each(function () {
        var e = Ie.getOrCreateInstance(this, i);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]()
        }
      })
    }
  }
  f.on(document, "click.bs.collapse.data-api", Pe, function (e) {
    ("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault();
    for (const e of h.getMultipleElementsFromSelector(this)) Ie.getOrCreateInstance(e, {
      toggle: !1
    }).toggle()
  }), e(Ie);
  var M = "top",
    k = "bottom",
    A = "right",
    O = "left",
    ze = "auto",
    P = [M, k, A, O],
    L = "start",
    y = "end",
    De = "clippingParents",
    Ne = "viewport",
    g = "popper",
    je = "reference",
    He = P.reduce(function (e, t) {
      return e.concat([t + "-" + L, t + "-" + y])
    }, []),
    Be = [].concat(P, [ze]).reduce(function (e, t) {
      return e.concat([t, t + "-" + L, t + "-" + y])
    }, []),
    qe = "beforeRead",
    Xe = "afterRead",
    Ye = "beforeMain",
    We = "afterMain",
    Fe = "beforeWrite",
    Re = "afterWrite",
    Ve = [qe, "read", Xe, Ye, "main", We, Fe, "write", Re];

  function v(e) {
    return e ? (e.nodeName || "").toLowerCase() : null
  }

  function w(e) {
    var t;
    return null == e ? window : "[object Window]" !== e.toString() ? (t = e.ownerDocument) && t.defaultView || window : e
  }

  function b(e) {
    return e instanceof w(e).Element || e instanceof Element
  }

  function x(e) {
    return e instanceof w(e).HTMLElement || e instanceof HTMLElement
  }

  function Ge(e) {
    return "undefined" != typeof ShadowRoot && (e instanceof w(e).ShadowRoot || e instanceof ShadowRoot)
  }
  var Ue = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: function (e) {
      var n = e.state;
      Object.keys(n.elements).forEach(function (e) {
        var t = n.styles[e] || {},
          i = n.attributes[e] || {},
          s = n.elements[e];
        x(s) && v(s) && (Object.assign(s.style, t), Object.keys(i).forEach(function (e) {
          var t = i[e];
          !1 === t ? s.removeAttribute(e) : s.setAttribute(e, !0 === t ? "" : t)
        }))
      })
    },
    effect: function (e) {
      var s = e.state,
        n = {
          popper: {
            position: s.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
          },
          arrow: {
            position: "absolute"
          },
          reference: {}
        };
      return Object.assign(s.elements.popper.style, n.popper), s.styles = n, s.elements.arrow && Object.assign(s.elements.arrow.style, n.arrow),
        function () {
          Object.keys(s.elements).forEach(function (e) {
            var t = s.elements[e],
              i = s.attributes[e] || {},
              e = Object.keys((s.styles.hasOwnProperty(e) ? s.styles : n)[e]).reduce(function (e, t) {
                return e[t] = "", e
              }, {});
            x(t) && v(t) && (Object.assign(t.style, e), Object.keys(i).forEach(function (e) {
              t.removeAttribute(e)
            }))
          })
        }
    },
    requires: ["computeStyles"]
  };

  function $(e) {
    return e.split("-")[0]
  }
  var S = Math.max,
    Ke = Math.min,
    _ = Math.round;

  function Qe() {
    var e = navigator.userAgentData;
    return null != e && e.brands ? e.brands.map(function (e) {
      return e.brand + "/" + e.version
    }).join(" ") : navigator.userAgent
  }

  function Ze() {
    return !/^((?!chrome|android).)*safari/i.test(Qe())
  }

  function E(e, t, i) {
    void 0 === t && (t = !1), void 0 === i && (i = !1);
    var s = e.getBoundingClientRect(),
      n = 1,
      a = 1,
      t = (t && x(e) && (n = 0 < e.offsetWidth && _(s.width) / e.offsetWidth || 1, a = 0 < e.offsetHeight && _(s.height) / e.offsetHeight || 1), (b(e) ? w(e) : window).visualViewport),
      e = !Ze() && i,
      i = (s.left + (e && t ? t.offsetLeft : 0)) / n,
      e = (s.top + (e && t ? t.offsetTop : 0)) / a,
      t = s.width / n,
      n = s.height / a;
    return {
      width: t,
      height: n,
      top: e,
      right: i + t,
      bottom: e + n,
      left: i,
      x: i,
      y: e
    }
  }

  function Je(e) {
    var t = E(e),
      i = e.offsetWidth,
      s = e.offsetHeight;
    return Math.abs(t.width - i) <= 1 && (i = t.width), Math.abs(t.height - s) <= 1 && (s = t.height), {
      x: e.offsetLeft,
      y: e.offsetTop,
      width: i,
      height: s
    }
  }

  function et(e, t) {
    var i = t.getRootNode && t.getRootNode();
    if (e.contains(t)) return !0;
    if (i && Ge(i)) {
      var s = t;
      do {
        if (s && e.isSameNode(s)) return !0
      } while (s = s.parentNode || s.host)
    }
    return !1
  }

  function T(e) {
    return w(e).getComputedStyle(e)
  }

  function C(e) {
    return ((b(e) ? e.ownerDocument : e.document) || window.document).documentElement
  }

  function tt(e) {
    return "html" === v(e) ? e : e.assignedSlot || e.parentNode || (Ge(e) ? e.host : null) || C(e)
  }

  function it(e) {
    return x(e) && "fixed" !== T(e).position ? e.offsetParent : null
  }

  function st(e) {
    for (var t, i = w(e), s = it(e); s && (t = s, 0 <= ["table", "td", "th"].indexOf(v(t))) && "static" === T(s).position;) s = it(s);
    return (!s || "html" !== v(s) && ("body" !== v(s) || "static" !== T(s).position)) && (s || function (e) {
      var t = /firefox/i.test(Qe());
      if (!/Trident/i.test(Qe()) || !x(e) || "fixed" !== T(e).position) {
        var i = tt(e);
        for (Ge(i) && (i = i.host); x(i) && ["html", "body"].indexOf(v(i)) < 0;) {
          var s = T(i);
          if ("none" !== s.transform || "none" !== s.perspective || "paint" === s.contain || -1 !== ["transform", "perspective"].indexOf(s.willChange) || t && "filter" === s.willChange || t && s.filter && "none" !== s.filter) return i;
          i = i.parentNode
        }
      }
      return null
    }(e)) || i
  }

  function nt(e) {
    return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
  }

  function at(e, t, i) {
    return S(e, Ke(t, i))
  }

  function rt(e) {
    return Object.assign({}, {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, e)
  }

  function ot(i, e) {
    return e.reduce(function (e, t) {
      return e[t] = i, e
    }, {})
  }
  var lt = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var t, i, s, n, a = e.state,
        r = e.name,
        e = e.options,
        o = a.elements.arrow,
        l = a.modifiersData.popperOffsets,
        d = $(a.placement),
        c = nt(d),
        d = 0 <= [O, A].indexOf(d) ? "height" : "width";
      o && l && (e = rt("number" != typeof (e = "function" == typeof (e = e.padding) ? e(Object.assign({}, a.rects, {
        placement: a.placement
      })) : e) ? e : ot(e, P)), t = Je(o), n = "y" === c ? M : O, s = "y" === c ? k : A, i = a.rects.reference[d] + a.rects.reference[c] - l[c] - a.rects.popper[d], l = l[c] - a.rects.reference[c], o = (o = st(o)) ? "y" === c ? o.clientHeight || 0 : o.clientWidth || 0 : 0, n = e[n], e = o - t[d] - e[s], n = at(n, s = o / 2 - t[d] / 2 + (i / 2 - l / 2), e), a.modifiersData[r] = ((o = {})[c] = n, o.centerOffset = n - s, o))
    },
    effect: function (e) {
      var t = e.state,
        e = e.options.element,
        e = void 0 === e ? "[data-popper-arrow]" : e;
      null != e && ("string" != typeof e || (e = t.elements.popper.querySelector(e))) && et(t.elements.popper, e) && (t.elements.arrow = e)
    },
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };

  function I(e) {
    return e.split("-")[1]
  }
  var dt = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };

  function ct(e) {
    var t, i = e.popper,
      s = e.popperRect,
      n = e.placement,
      a = e.variation,
      r = e.offsets,
      o = e.position,
      l = e.gpuAcceleration,
      d = e.adaptive,
      c = e.roundOffsets,
      e = e.isFixed,
      h = r.x,
      h = void 0 === h ? 0 : h,
      p = r.y,
      p = void 0 === p ? 0 : p,
      u = "function" == typeof c ? c({
        x: h,
        y: p
      }) : {
        x: h,
        y: p
      },
      h = u.x,
      p = u.y,
      u = r.hasOwnProperty("x"),
      r = r.hasOwnProperty("y"),
      f = O,
      m = M,
      g = window;
    d && (b = "clientHeight", t = "clientWidth", (v = st(i)) === w(i) && "static" !== T(v = C(i)).position && "absolute" === o && (b = "scrollHeight", t = "scrollWidth"), n !== M && (n !== O && n !== A || a !== y) || (m = k, p = (p - ((e && v === g && g.visualViewport ? g.visualViewport.height : v[b]) - s.height)) * (l ? 1 : -1)), n !== O && (n !== M && n !== k || a !== y) || (f = A, h = (h - ((e && v === g && g.visualViewport ? g.visualViewport.width : v[t]) - s.width)) * (l ? 1 : -1)));
    var v, b, i = Object.assign({
        position: o
      }, d && dt),
      e = !0 === c ? (n = (b = {
        x: h,
        y: p
      }).y, a = window.devicePixelRatio || 1, {
        x: _(b.x * a) / a || 0,
        y: _(n * a) / a || 0
      }) : {
        x: h,
        y: p
      };
    return h = e.x, p = e.y, l ? Object.assign({}, i, ((v = {})[m] = r ? "0" : "", v[f] = u ? "0" : "", v.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + p + "px)" : "translate3d(" + h + "px, " + p + "px, 0)", v)) : Object.assign({}, i, ((t = {})[m] = r ? p + "px" : "", t[f] = u ? h + "px" : "", t.transform = "", t))
  }
  var ht = {
      name: "computeStyles",
      enabled: !0,
      phase: "beforeWrite",
      fn: function (e) {
        var t = e.state,
          e = e.options,
          i = e.gpuAcceleration,
          i = void 0 === i || i,
          s = e.adaptive,
          s = void 0 === s || s,
          e = e.roundOffsets,
          e = void 0 === e || e,
          i = {
            placement: $(t.placement),
            variation: I(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: i,
            isFixed: "fixed" === t.options.strategy
          };
        null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, ct(Object.assign({}, i, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: s,
          roundOffsets: e
        })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, ct(Object.assign({}, i, {
          offsets: t.modifiersData.arrow,
          position: "absolute",
          adaptive: !1,
          roundOffsets: e
        })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
          "data-popper-placement": t.placement
        })
      },
      data: {}
    },
    pt = {
      passive: !0
    },
    ut = {
      name: "eventListeners",
      enabled: !0,
      phase: "write",
      fn: function () {},
      effect: function (e) {
        var t = e.state,
          i = e.instance,
          e = e.options,
          s = e.scroll,
          n = void 0 === s || s,
          s = e.resize,
          a = void 0 === s || s,
          r = w(t.elements.popper),
          o = [].concat(t.scrollParents.reference, t.scrollParents.popper);
        return n && o.forEach(function (e) {
            e.addEventListener("scroll", i.update, pt)
          }), a && r.addEventListener("resize", i.update, pt),
          function () {
            n && o.forEach(function (e) {
              e.removeEventListener("scroll", i.update, pt)
            }), a && r.removeEventListener("resize", i.update, pt)
          }
      },
      data: {}
    },
    ft = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };

  function mt(e) {
    return e.replace(/left|right|bottom|top/g, function (e) {
      return ft[e]
    })
  }
  var gt = {
    start: "end",
    end: "start"
  };

  function vt(e) {
    return e.replace(/start|end/g, function (e) {
      return gt[e]
    })
  }

  function bt(e) {
    e = w(e);
    return {
      scrollLeft: e.pageXOffset,
      scrollTop: e.pageYOffset
    }
  }

  function yt(e) {
    return E(C(e)).left + bt(e).scrollLeft
  }

  function wt(e) {
    var e = T(e),
      t = e.overflow,
      i = e.overflowX,
      e = e.overflowY;
    return /auto|scroll|overlay|hidden/.test(t + e + i)
  }

  function xt(e, t) {
    void 0 === t && (t = []);
    var i = function e(t) {
        return 0 <= ["html", "body", "#document"].indexOf(v(t)) ? t.ownerDocument.body : x(t) && wt(t) ? t : e(tt(t))
      }(e),
      e = i === (null == (e = e.ownerDocument) ? void 0 : e.body),
      s = w(i),
      s = e ? [s].concat(s.visualViewport || [], wt(i) ? i : []) : i,
      i = t.concat(s);
    return e ? i : i.concat(xt(tt(s)))
  }

  function _t(e) {
    return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height
    })
  }

  function Et(e, t, i) {
    return t === Ne ? _t((n = i, r = w(s = e), o = C(s), r = r.visualViewport, l = o.clientWidth, o = o.clientHeight, c = d = 0, r && (l = r.width, o = r.height, (a = Ze()) || !a && "fixed" === n) && (d = r.offsetLeft, c = r.offsetTop), {
      width: l,
      height: o,
      x: d + yt(s),
      y: c
    })) : b(t) ? ((n = E(a = t, !1, "fixed" === i)).top = n.top + a.clientTop, n.left = n.left + a.clientLeft, n.bottom = n.top + a.clientHeight, n.right = n.left + a.clientWidth, n.width = a.clientWidth, n.height = a.clientHeight, n.x = n.left, n.y = n.top, n) : _t((r = C(e), l = C(r), o = bt(r), d = null == (d = r.ownerDocument) ? void 0 : d.body, s = S(l.scrollWidth, l.clientWidth, d ? d.scrollWidth : 0, d ? d.clientWidth : 0), c = S(l.scrollHeight, l.clientHeight, d ? d.scrollHeight : 0, d ? d.clientHeight : 0), r = -o.scrollLeft + yt(r), o = -o.scrollTop, "rtl" === T(d || l).direction && (r += S(l.clientWidth, d ? d.clientWidth : 0) - s), {
      width: s,
      height: c,
      x: r,
      y: o
    }));
    var s, n, a, r, o, l, d, c
  }

  function Tt(e) {
    var t, i = e.reference,
      s = e.element,
      e = e.placement,
      n = e ? $(e) : null,
      e = e ? I(e) : null,
      a = i.x + i.width / 2 - s.width / 2,
      r = i.y + i.height / 2 - s.height / 2;
    switch (n) {
      case M:
        t = {
          x: a,
          y: i.y - s.height
        };
        break;
      case k:
        t = {
          x: a,
          y: i.y + i.height
        };
        break;
      case A:
        t = {
          x: i.x + i.width,
          y: r
        };
        break;
      case O:
        t = {
          x: i.x - s.width,
          y: r
        };
        break;
      default:
        t = {
          x: i.x,
          y: i.y
        }
    }
    var o = n ? nt(n) : null;
    if (null != o) {
      var l = "y" === o ? "height" : "width";
      switch (e) {
        case L:
          t[o] = t[o] - (i[l] / 2 - s[l] / 2);
          break;
        case y:
          t[o] = t[o] + (i[l] / 2 - s[l] / 2)
      }
    }
    return t
  }

  function Ct(e, t) {
    var i, s, n, a, r, o, t = t = void 0 === t ? {} : t,
      l = t.placement,
      l = void 0 === l ? e.placement : l,
      d = t.strategy,
      d = void 0 === d ? e.strategy : d,
      c = t.boundary,
      c = void 0 === c ? De : c,
      h = t.rootBoundary,
      h = void 0 === h ? Ne : h,
      p = t.elementContext,
      p = void 0 === p ? g : p,
      u = t.altBoundary,
      u = void 0 !== u && u,
      t = t.padding,
      t = void 0 === t ? 0 : t,
      t = rt("number" != typeof t ? t : ot(t, P)),
      f = e.rects.popper,
      u = e.elements[u ? p === g ? je : g : p],
      d = (i = b(u) ? u : u.contextElement || C(e.elements.popper), u = h, s = d, a = "clippingParents" === (h = c) ? (r = xt(tt(a = i)), b(n = 0 <= ["absolute", "fixed"].indexOf(T(a).position) && x(a) ? st(a) : a) ? r.filter(function (e) {
        return b(e) && et(e, n) && "body" !== v(e)
      }) : []) : [].concat(h), r = [].concat(a, [u]), h = r[0], (u = r.reduce(function (e, t) {
        t = Et(i, t, s);
        return e.top = S(t.top, e.top), e.right = Ke(t.right, e.right), e.bottom = Ke(t.bottom, e.bottom), e.left = S(t.left, e.left), e
      }, Et(i, h, s))).width = u.right - u.left, u.height = u.bottom - u.top, u.x = u.left, u.y = u.top, u),
      c = E(e.elements.reference),
      h = Tt({
        reference: c,
        element: f,
        strategy: "absolute",
        placement: l
      }),
      u = _t(Object.assign({}, f, h)),
      f = p === g ? u : c,
      m = {
        top: d.top - f.top + t.top,
        bottom: f.bottom - d.bottom + t.bottom,
        left: d.left - f.left + t.left,
        right: f.right - d.right + t.right
      },
      h = e.modifiersData.offset;
    return p === g && h && (o = h[l], Object.keys(m).forEach(function (e) {
      var t = 0 <= [A, k].indexOf(e) ? 1 : -1,
        i = 0 <= [M, k].indexOf(e) ? "y" : "x";
      m[e] += o[i] * t
    })), m
  }
  var St = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: function (e) {
      var h = e.state,
        t = e.options,
        e = e.name;
      if (!h.modifiersData[e]._skip) {
        for (var i = t.mainAxis, s = void 0 === i || i, i = t.altAxis, n = void 0 === i || i, i = t.fallbackPlacements, p = t.padding, u = t.boundary, f = t.rootBoundary, a = t.altBoundary, r = t.flipVariations, m = void 0 === r || r, g = t.allowedAutoPlacements, r = h.options.placement, t = $(r), i = i || (t !== r && m ? $(i = r) === ze ? [] : (t = mt(i), [vt(i), t, vt(t)]) : [mt(r)]), o = [r].concat(i).reduce(function (e, t) {
            return e.concat($(t) === ze ? (i = h, s = (e = e = void 0 === (e = {
              placement: t,
              boundary: u,
              rootBoundary: f,
              padding: p,
              flipVariations: m,
              allowedAutoPlacements: g
            }) ? {} : e).placement, n = e.boundary, a = e.rootBoundary, r = e.padding, o = e.flipVariations, l = void 0 === (e = e.allowedAutoPlacements) ? Be : e, d = I(s), e = d ? o ? He : He.filter(function (e) {
              return I(e) === d
            }) : P, c = (s = 0 === (s = e.filter(function (e) {
              return 0 <= l.indexOf(e)
            })).length ? e : s).reduce(function (e, t) {
              return e[t] = Ct(i, {
                placement: t,
                boundary: n,
                rootBoundary: a,
                padding: r
              })[$(t)], e
            }, {}), Object.keys(c).sort(function (e, t) {
              return c[e] - c[t]
            })) : t);
            var i, s, n, a, r, o, l, d, c
          }, []), l = h.rects.reference, d = h.rects.popper, c = new Map, v = !0, b = o[0], y = 0; y < o.length; y++) {
          var w = o[y],
            x = $(w),
            _ = I(w) === L,
            E = 0 <= [M, k].indexOf(x),
            T = E ? "width" : "height",
            C = Ct(h, {
              placement: w,
              boundary: u,
              rootBoundary: f,
              altBoundary: a,
              padding: p
            }),
            E = E ? _ ? A : O : _ ? k : M,
            _ = (l[T] > d[T] && (E = mt(E)), mt(E)),
            T = [];
          if (s && T.push(C[x] <= 0), n && T.push(C[E] <= 0, C[_] <= 0), T.every(function (e) {
              return e
            })) {
            b = w, v = !1;
            break
          }
          c.set(w, T)
        }
        if (v)
          for (var S = m ? 3 : 1; 0 < S && "break" !== function (t) {
              var e = o.find(function (e) {
                e = c.get(e);
                if (e) return e.slice(0, t).every(function (e) {
                  return e
                })
              });
              if (e) return b = e, "break"
            }(S); S--);
        h.placement !== b && (h.modifiersData[e]._skip = !0, h.placement = b, h.reset = !0)
      }
    },
    requiresIfExists: ["offset"],
    data: {
      _skip: !1
    }
  };

  function Mt(e, t, i) {
    return {
      top: e.top - t.height - (i = void 0 === i ? {
        x: 0,
        y: 0
      } : i).y,
      right: e.right - t.width + i.x,
      bottom: e.bottom - t.height + i.y,
      left: e.left - t.width - i.x
    }
  }

  function kt(t) {
    return [M, A, k, O].some(function (e) {
      return 0 <= t[e]
    })
  }
  var At = {
      name: "hide",
      enabled: !0,
      phase: "main",
      requiresIfExists: ["preventOverflow"],
      fn: function (e) {
        var t = e.state,
          e = e.name,
          i = t.rects.reference,
          s = t.rects.popper,
          n = t.modifiersData.preventOverflow,
          a = Ct(t, {
            elementContext: "reference"
          }),
          r = Ct(t, {
            altBoundary: !0
          }),
          a = Mt(a, i),
          i = Mt(r, s, n),
          r = kt(a),
          s = kt(i);
        t.modifiersData[e] = {
          referenceClippingOffsets: a,
          popperEscapeOffsets: i,
          isReferenceHidden: r,
          hasPopperEscaped: s
        }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
          "data-popper-reference-hidden": r,
          "data-popper-escaped": s
        })
      }
    },
    Ot = {
      name: "offset",
      enabled: !0,
      phase: "main",
      requires: ["popperOffsets"],
      fn: function (e) {
        var r = e.state,
          t = e.options,
          e = e.name,
          t = t.offset,
          o = void 0 === t ? [0, 0] : t,
          t = Be.reduce(function (e, t) {
            return e[t] = (t = t, i = r.rects, s = o, n = $(t), a = 0 <= [O, M].indexOf(n) ? -1 : 1, i = "function" == typeof s ? s(Object.assign({}, i, {
              placement: t
            })) : s, t = i[0] || 0, s = (i[1] || 0) * a, 0 <= [O, A].indexOf(n) ? {
              x: s,
              y: t
            } : {
              x: t,
              y: s
            }), e;
            var i, s, n, a
          }, {}),
          i = t[r.placement],
          s = i.x,
          i = i.y;
        null != r.modifiersData.popperOffsets && (r.modifiersData.popperOffsets.x += s, r.modifiersData.popperOffsets.y += i), r.modifiersData[e] = t
      }
    },
    Pt = {
      name: "popperOffsets",
      enabled: !0,
      phase: "read",
      fn: function (e) {
        var t = e.state,
          e = e.name;
        t.modifiersData[e] = Tt({
          reference: t.rects.reference,
          element: t.rects.popper,
          strategy: "absolute",
          placement: t.placement
        })
      },
      data: {}
    },
    Lt = {
      name: "preventOverflow",
      enabled: !0,
      phase: "main",
      fn: function (e) {
        var t, i, s, n, a, r, o, l, d, c = e.state,
          h = e.options,
          e = e.name,
          p = h.mainAxis,
          p = void 0 === p || p,
          u = h.altAxis,
          u = void 0 !== u && u,
          f = h.boundary,
          m = h.rootBoundary,
          g = h.altBoundary,
          v = h.padding,
          b = h.tether,
          b = void 0 === b || b,
          h = h.tetherOffset,
          h = void 0 === h ? 0 : h,
          f = Ct(c, {
            boundary: f,
            rootBoundary: m,
            padding: v,
            altBoundary: g
          }),
          m = $(c.placement),
          v = I(c.placement),
          g = !v,
          y = nt(m),
          w = "x" === y ? "y" : "x",
          x = c.modifiersData.popperOffsets,
          _ = c.rects.reference,
          E = c.rects.popper,
          h = "function" == typeof h ? h(Object.assign({}, c.rects, {
            placement: c.placement
          })) : h,
          h = "number" == typeof h ? {
            mainAxis: h,
            altAxis: h
          } : Object.assign({
            mainAxis: 0,
            altAxis: 0
          }, h),
          T = c.modifiersData.offset ? c.modifiersData.offset[c.placement] : null,
          C = {
            x: 0,
            y: 0
          };
        x && (p && (p = "y" === y ? "height" : "width", r = (o = x[y]) + f[i = "y" === y ? M : O], l = o - f[d = "y" === y ? k : A], t = b ? -E[p] / 2 : 0, n = (v === L ? _ : E)[p], v = v === L ? -E[p] : -_[p], a = c.elements.arrow, a = b && a ? Je(a) : {
          width: 0,
          height: 0
        }, i = (s = c.modifiersData["arrow#persistent"] ? c.modifiersData["arrow#persistent"].padding : {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        })[i], s = s[d], d = at(0, _[p], a[p]), a = g ? _[p] / 2 - t - d - i - h.mainAxis : n - d - i - h.mainAxis, n = g ? -_[p] / 2 + t + d + s + h.mainAxis : v + d + s + h.mainAxis, g = (i = c.elements.arrow && st(c.elements.arrow)) ? "y" === y ? i.clientTop || 0 : i.clientLeft || 0 : 0, v = o + n - (t = null != (p = null == T ? void 0 : T[y]) ? p : 0), d = at(b ? Ke(r, o + a - t - g) : r, o, b ? S(l, v) : l), x[y] = d, C[y] = d - o), u && (s = "y" == w ? "height" : "width", n = (i = x[w]) + f["x" === y ? M : O], p = i - f["x" === y ? k : A], a = -1 !== [M, O].indexOf(m), g = null != (t = null == T ? void 0 : T[w]) ? t : 0, r = a ? n : i - _[s] - E[s] - g + h.altAxis, v = a ? i + _[s] + E[s] - g - h.altAxis : p, o = b && a ? (d = at(r, i, l = v), l < d ? l : d) : at(b ? r : n, i, b ? v : p), x[w] = o, C[w] = o - i), c.modifiersData[e] = C)
      },
      requiresIfExists: ["offset"]
    };

  function $t(e) {
    var i = new Map,
      s = new Set,
      n = [];
    return e.forEach(function (e) {
      i.set(e.name, e)
    }), e.forEach(function (e) {
      s.has(e.name) || function t(e) {
        s.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function (e) {
          s.has(e) || (e = i.get(e)) && t(e)
        }), n.push(e)
      }(e)
    }), n
  }
  var It = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };

  function zt() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
    return !t.some(function (e) {
      return !(e && "function" == typeof e.getBoundingClientRect)
    })
  }

  function Dt(e) {
    var e = e = void 0 === e ? {} : e,
      t = e.defaultModifiers,
      l = void 0 === t ? [] : t,
      t = e.defaultOptions,
      d = void 0 === t ? It : t;
    return function (s, n, t) {
      void 0 === t && (t = d);
      var i, a, u = {
          placement: "bottom",
          orderedModifiers: [],
          options: Object.assign({}, It, d),
          modifiersData: {},
          elements: {
            reference: s,
            popper: n
          },
          attributes: {},
          styles: {}
        },
        r = [],
        f = !1,
        m = {
          state: u,
          setOptions: function (e) {
            e = "function" == typeof e ? e(u.options) : e;
            o(), u.options = Object.assign({}, d, u.options, e), u.scrollParents = {
              reference: b(s) ? xt(s) : s.contextElement ? xt(s.contextElement) : [],
              popper: xt(n)
            };
            e = [].concat(l, u.options.modifiers), t = e.reduce(function (e, t) {
              var i = e[t.name];
              return e[t.name] = i ? Object.assign({}, i, t, {
                options: Object.assign({}, i.options, t.options),
                data: Object.assign({}, i.data, t.data)
              }) : t, e
            }, {}), i = $t(Object.keys(t).map(function (e) {
              return t[e]
            }));
            var t, i, e = Ve.reduce(function (e, t) {
              return e.concat(i.filter(function (e) {
                return e.phase === t
              }))
            }, []);
            return u.orderedModifiers = e.filter(function (e) {
              return e.enabled
            }), u.orderedModifiers.forEach(function (e) {
              var t = e.name,
                i = e.options,
                e = e.effect;
              "function" == typeof e && (e = e({
                state: u,
                name: t,
                instance: m,
                options: void 0 === i ? {} : i
              }), r.push(e || function () {}))
            }), m.update()
          },
          forceUpdate: function () {
            if (!f) {
              var e = u.elements,
                t = e.reference,
                e = e.popper;
              if (zt(t, e)) {
                u.rects = {
                  reference: (t = t, r = st(e), void 0 === (o = "fixed" === u.options.strategy) && (o = !1), l = x(r), d = x(r) && (h = (d = r).getBoundingClientRect(), c = _(h.width) / d.offsetWidth || 1, h = _(h.height) / d.offsetHeight || 1, 1 !== c || 1 !== h), c = C(r), h = E(t, d, o), t = {
                    scrollLeft: 0,
                    scrollTop: 0
                  }, p = {
                    x: 0,
                    y: 0
                  }, !l && o || ("body" === v(r) && !wt(c) || (t = (l = r) !== w(l) && x(l) ? {
                    scrollLeft: l.scrollLeft,
                    scrollTop: l.scrollTop
                  } : bt(l)), x(r) ? ((p = E(r, !0)).x += r.clientLeft, p.y += r.clientTop) : c && (p.x = yt(c))), {
                    x: h.left + t.scrollLeft - p.x,
                    y: h.top + t.scrollTop - p.y,
                    width: h.width,
                    height: h.height
                  }),
                  popper: Je(e)
                }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function (e) {
                  return u.modifiersData[e.name] = Object.assign({}, e.data)
                });
                for (var i, s, n, a = 0; a < u.orderedModifiers.length; a++) !0 !== u.reset ? (i = (n = u.orderedModifiers[a]).fn, s = n.options, n = n.name, "function" == typeof i && (u = i({
                  state: u,
                  options: void 0 === s ? {} : s,
                  name: n,
                  instance: m
                }) || u)) : (u.reset = !1, a = -1)
              }
            }
            var r, o, l, d, c, h, p
          },
          update: (i = function () {
            return new Promise(function (e) {
              m.forceUpdate(), e(u)
            })
          }, function () {
            return a = a || new Promise(function (e) {
              Promise.resolve().then(function () {
                a = void 0, e(i())
              })
            })
          }),
          destroy: function () {
            o(), f = !0
          }
        };
      return zt(s, n) && m.setOptions(t).then(function (e) {
        !f && t.onFirstUpdate && t.onFirstUpdate(e)
      }), m;

      function o() {
        r.forEach(function (e) {
          return e()
        }), r = []
      }
    }
  }
  var Nt = Dt(),
    jt = Dt({
      defaultModifiers: [ut, Pt, ht, Ue]
    }),
    Ht = Dt({
      defaultModifiers: [ut, Pt, ht, Ue, Ot, St, Lt, lt, At]
    });
  const Bt = Object.freeze(Object.defineProperty({
      __proto__: null,
      popperGenerator: Dt,
      detectOverflow: Ct,
      createPopperBase: Nt,
      createPopper: Ht,
      createPopperLite: jt,
      top: M,
      bottom: k,
      right: A,
      left: O,
      auto: ze,
      basePlacements: P,
      start: L,
      end: y,
      clippingParents: De,
      viewport: Ne,
      popper: g,
      reference: je,
      variationPlacements: He,
      placements: Be,
      beforeRead: qe,
      read: "read",
      afterRead: Xe,
      beforeMain: Ye,
      main: "main",
      afterMain: We,
      beforeWrite: Fe,
      write: "write",
      afterWrite: Re,
      modifierPhases: Ve,
      applyStyles: Ue,
      arrow: lt,
      computeStyles: ht,
      eventListeners: ut,
      flip: St,
      hide: At,
      offset: Ot,
      popperOffsets: Pt,
      preventOverflow: Lt
    }, Symbol.toStringTag, {
      value: "Module"
    })),
    qt = "dropdown",
    Xt = "ArrowDown",
    Yt = "click.bs.dropdown.data-api",
    Wt = "keydown.bs.dropdown.data-api",
    Ft = "show",
    u = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
    Rt = (u, ".dropdown-menu"),
    Vt = o() ? "top-end" : "top-start",
    Gt = o() ? "top-start" : "top-end",
    Ut = o() ? "bottom-end" : "bottom-start",
    Kt = o() ? "bottom-start" : "bottom-end",
    Qt = o() ? "left-start" : "right-start",
    Zt = o() ? "right-start" : "left-start",
    Jt = {
      autoClose: !0,
      boundary: "clippingParents",
      display: "dynamic",
      offset: [0, 2],
      popperConfig: null,
      reference: "toggle"
    },
    ei = {
      autoClose: "(boolean|string)",
      boundary: "(string|element)",
      display: "string",
      offset: "(array|string|function)",
      popperConfig: "(null|object|function)",
      reference: "(string|element|object)"
    };
  class m extends t {
    constructor(e, t) {
      super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = h.next(this._element, Rt)[0] || h.prev(this._element, Rt)[0] || h.findOne(Rt, this._parent), this._inNavbar = this._detectNavbar()
    }
    static get Default() {
      return Jt
    }
    static get DefaultType() {
      return ei
    }
    static get NAME() {
      return qt
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show()
    }
    show() {
      if (!a(this._element) && !this._isShown()) {
        const e = {
          relatedTarget: this._element
        };
        if (!f.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
          if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
            for (const e of [].concat(...document.body.children)) f.on(e, "mouseover", B);
          this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Ft), this._element.classList.add(Ft), f.trigger(this._element, "shown.bs.dropdown", e)
        }
      }
    }
    hide() {
      var e;
      !a(this._element) && this._isShown() && (e = {
        relatedTarget: this._element
      }, this._completeHide(e))
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose()
    }
    update() {
      this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
    }
    _completeHide(e) {
      if (!f.trigger(this._element, "hide.bs.dropdown", e).defaultPrevented) {
        if ("ontouchstart" in document.documentElement)
          for (const e of [].concat(...document.body.children)) f.off(e, "mouseover", B);
        this._popper && this._popper.destroy(), this._menu.classList.remove(Ft), this._element.classList.remove(Ft), this._element.setAttribute("aria-expanded", "false"), c.removeDataAttribute(this._menu, "popper"), f.trigger(this._element, "hidden.bs.dropdown", e)
      }
    }
    _getConfig(e) {
      if ("object" != typeof (e = super._getConfig(e)).reference || r(e.reference) || "function" == typeof e.reference.getBoundingClientRect) return e;
      throw new TypeError(qt.toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.')
    }
    _createPopper() {
      if (void 0 === Bt) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
      let e = this._element;
      "parent" === this._config.reference ? e = this._parent : r(this._config.reference) ? e = s(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
      var t = this._getPopperConfig();
      this._popper = Ht(e, this._menu, t)
    }
    _isShown() {
      return this._menu.classList.contains(Ft)
    }
    _getPlacement() {
      var e, t = this._parent;
      return t.classList.contains("dropend") ? Qt : t.classList.contains("dropstart") ? Zt : t.classList.contains("dropup-center") ? "top" : t.classList.contains("dropdown-center") ? "bottom" : (e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim(), t.classList.contains("dropup") ? e ? Gt : Vt : e ? Kt : Ut)
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar")
    }
    _getOffset() {
      const t = this._config["offset"];
      return "string" == typeof t ? t.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof t ? e => t(e, this._element) : t
    }
    _getPopperConfig() {
      var e = {
        placement: this._getPlacement(),
        modifiers: [{
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }]
      };
      return !this._inNavbar && "static" !== this._config.display || (c.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
        name: "applyStyles",
        enabled: !1
      }]), {
        ...e,
        ...l(this._config.popperConfig, [e])
      }
    }
    _selectMenuItem({
      key: e,
      target: t
    }) {
      var i = h.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(e => n(e));
      i.length && F(i, t, e === Xt, !i.includes(t)).focus()
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = m.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]()
        }
      })
    }
    static clearMenus(e) {
      if (2 !== e.button && ("keyup" !== e.type || "Tab" === e.key)) {
        const s = h.find('[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled).show');
        for (const n of s) {
          const s = m.getInstance(n);
          var t, i;
          s && !1 !== s._config.autoClose && (t = (i = e.composedPath()).includes(s._menu), i.includes(s._element) || "inside" === s._config.autoClose && !t || "outside" === s._config.autoClose && t || s._menu.contains(e.target) && ("keyup" === e.type && "Tab" === e.key || /input|select|option|textarea|form/i.test(e.target.tagName)) || (i = {
            relatedTarget: s._element
          }, "click" === e.type && (i.clickEvent = e), s._completeHide(i)))
        }
      }
    }
    static dataApiKeydownHandler(e) {
      var t = /input|textarea/i.test(e.target.tagName),
        i = "Escape" === e.key,
        s = ["ArrowUp", Xt].includes(e.key);
      !s && !i || t && !i || (e.preventDefault(), t = this.matches(u) ? this : h.prev(this, u)[0] || h.next(this, u)[0] || h.findOne(u, e.delegateTarget.parentNode), i = m.getOrCreateInstance(t), s ? (e.stopPropagation(), i.show(), i._selectMenuItem(e)) : i._isShown() && (e.stopPropagation(), i.hide(), t.focus()))
    }
  }
  f.on(document, Wt, u, m.dataApiKeydownHandler), f.on(document, Wt, Rt, m.dataApiKeydownHandler), f.on(document, Yt, m.clearMenus), f.on(document, "keyup.bs.dropdown.data-api", m.clearMenus), f.on(document, Yt, u, function (e) {
    e.preventDefault(), m.getOrCreateInstance(this).toggle()
  }), e(m);
  const ti = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    ii = ".sticky-top",
    si = "padding-right",
    ni = "margin-right";
  class ai {
    constructor() {
      this._element = document.body
    }
    getWidth() {
      var e = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - e)
    }
    hide() {
      const t = this.getWidth();
      this._disableOverFlow(), this._setElementAttributes(this._element, si, e => e + t), this._setElementAttributes(ti, si, e => e + t), this._setElementAttributes(ii, ni, e => e - t)
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, si), this._resetElementAttributes(ti, si), this._resetElementAttributes(ii, ni)
    }
    isOverflowing() {
      return 0 < this.getWidth()
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
    }
    _setElementAttributes(e, i, s) {
      const n = this.getWidth();
      this._applyManipulationCallback(e, e => {
        var t;
        e !== this._element && window.innerWidth > e.clientWidth + n || (this._saveInitialAttribute(e, i), t = window.getComputedStyle(e).getPropertyValue(i), e.style.setProperty(i, s(Number.parseFloat(t)) + "px"))
      })
    }
    _saveInitialAttribute(e, t) {
      var i = e.style.getPropertyValue(t);
      i && c.setDataAttribute(e, t, i)
    }
    _resetElementAttributes(e, i) {
      this._applyManipulationCallback(e, e => {
        var t = c.getDataAttribute(e, i);
        null !== t ? (c.removeDataAttribute(e, i), e.style.setProperty(i, t)) : e.style.removeProperty(i)
      })
    }
    _applyManipulationCallback(e, t) {
      if (r(e)) t(e);
      else
        for (const i of h.find(e, this._element)) t(i)
    }
  }
  const ri = "mousedown.bs.backdrop",
    oi = {
      className: "modal-backdrop",
      clickCallback: null,
      isAnimated: !1,
      isVisible: !0,
      rootElement: "body"
    },
    li = {
      className: "string",
      clickCallback: "(function|null)",
      isAnimated: "boolean",
      isVisible: "boolean",
      rootElement: "(element|string)"
    };
  class di extends ce {
    constructor(e) {
      super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null
    }
    static get Default() {
      return oi
    }
    static get DefaultType() {
      return li
    }
    static get NAME() {
      return "backdrop"
    }
    show(e) {
      var t;
      this._config.isVisible ? (this._append(), t = this._getElement(), this._config.isAnimated && q(t), t.classList.add("show"), this._emulateAnimation(() => {
        l(e)
      })) : l(e)
    }
    hide(e) {
      this._config.isVisible ? (this._getElement().classList.remove("show"), this._emulateAnimation(() => {
        this.dispose(), l(e)
      })) : l(e)
    }
    dispose() {
      this._isAppended && (f.off(this._element, ri), this._element.remove(), this._isAppended = !1)
    }
    _getElement() {
      var e;
      return this._element || ((e = document.createElement("div")).className = this._config.className, this._config.isAnimated && e.classList.add("fade"), this._element = e), this._element
    }
    _configAfterMerge(e) {
      return e.rootElement = s(e.rootElement), e
    }
    _append() {
      var e;
      this._isAppended || (e = this._getElement(), this._config.rootElement.append(e), f.on(e, ri, () => {
        l(this._config.clickCallback)
      }), this._isAppended = !0)
    }
    _emulateAnimation(e) {
      W(e, this._getElement(), this._config.isAnimated)
    }
  }
  const ci = ".bs.focustrap",
    hi = "backward",
    pi = {
      autofocus: !0,
      trapElement: null
    },
    ui = {
      autofocus: "boolean",
      trapElement: "element"
    };
  class fi extends ce {
    constructor(e) {
      super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null
    }
    static get Default() {
      return pi
    }
    static get DefaultType() {
      return ui
    }
    static get NAME() {
      return "focustrap"
    }
    activate() {
      this._isActive || (this._config.autofocus && this._config.trapElement.focus(), f.off(document, ci), f.on(document, "focusin.bs.focustrap", e => this._handleFocusin(e)), f.on(document, "keydown.tab.bs.focustrap", e => this._handleKeydown(e)), this._isActive = !0)
    }
    deactivate() {
      this._isActive && (this._isActive = !1, f.off(document, ci))
    }
    _handleFocusin(e) {
      var t = this._config["trapElement"];
      e.target === document || e.target === t || t.contains(e.target) || (0 === (e = h.focusableChildren(t)).length ? t : this._lastTabNavDirection === hi ? e[e.length - 1] : e[0]).focus()
    }
    _handleKeydown(e) {
      "Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? hi : "forward")
    }
  }
  const mi = "hidden.bs.modal",
    gi = "show.bs.modal",
    vi = "modal-open",
    bi = "modal-static",
    yi = {
      backdrop: !0,
      focus: !0,
      keyboard: !0
    },
    wi = {
      backdrop: "(boolean|string)",
      focus: "boolean",
      keyboard: "boolean"
    };
  class xi extends t {
    constructor(e, t) {
      super(e, t), this._dialog = h.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new ai, this._addEventListeners()
    }
    static get Default() {
      return yi
    }
    static get DefaultType() {
      return wi
    }
    static get NAME() {
      return "modal"
    }
    toggle(e) {
      return this._isShown ? this.hide() : this.show(e)
    }
    show(e) {
      this._isShown || this._isTransitioning || f.trigger(this._element, gi, {
        relatedTarget: e
      }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(vi), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)))
    }
    hide() {
      !this._isShown || this._isTransitioning || f.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove("show"), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()))
    }
    dispose() {
      for (const e of [window, this._dialog]) f.off(e, ".bs.modal");
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    handleUpdate() {
      this._adjustDialog()
    }
    _initializeBackDrop() {
      return new di({
        isVisible: Boolean(this._config.backdrop),
        isAnimated: this._isAnimated()
      })
    }
    _initializeFocusTrap() {
      return new fi({
        trapElement: this._element
      })
    }
    _showElement(e) {
      document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
      var t = h.findOne(".modal-body", this._dialog);
      t && (t.scrollTop = 0), q(this._element), this._element.classList.add("show"), this._queueCallback(() => {
        this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, f.trigger(this._element, "shown.bs.modal", {
          relatedTarget: e
        })
      }, this._dialog, this._isAnimated())
    }
    _addEventListeners() {
      f.on(this._element, "keydown.dismiss.bs.modal", e => {
        if ("Escape" === e.key) return this._config.keyboard ? (e.preventDefault(), void this.hide()) : void this._triggerBackdropTransition()
      }), f.on(window, "resize.bs.modal", () => {
        this._isShown && !this._isTransitioning && this._adjustDialog()
      }), f.on(this._element, "mousedown.dismiss.bs.modal", t => {
        f.one(this._element, "click.dismiss.bs.modal", e => {
          this._element === t.target && this._element === e.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition())
        })
      })
    }
    _hideModal() {
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => {
        document.body.classList.remove(vi), this._resetAdjustments(), this._scrollBar.reset(), f.trigger(this._element, mi)
      })
    }
    _isAnimated() {
      return this._element.classList.contains("fade")
    }
    _triggerBackdropTransition() {
      if (!f.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) {
        const e = this._element.scrollHeight > document.documentElement.clientHeight,
          t = this._element.style.overflowY;
        "hidden" === t || this._element.classList.contains(bi) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(bi), this._queueCallback(() => {
          this._element.classList.remove(bi), this._queueCallback(() => {
            this._element.style.overflowY = t
          }, this._dialog)
        }, this._dialog), this._element.focus())
      }
    }
    _adjustDialog() {
      const e = this._element.scrollHeight > document.documentElement.clientHeight,
        t = this._scrollBar.getWidth(),
        i = 0 < t;
      if (i && !e) {
        const e = o() ? "paddingLeft" : "paddingRight";
        this._element.style[e] = t + "px"
      }
      if (!i && e) {
        const e = o() ? "paddingRight" : "paddingLeft";
        this._element.style[e] = t + "px"
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
    }
    static jQueryInterface(t, i) {
      return this.each(function () {
        var e = xi.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t](i)
        }
      })
    }
  }
  f.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', function (e) {
    const t = h.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(), f.one(t, gi, e => {
      e.defaultPrevented || f.one(t, mi, () => {
        n(this) && this.focus()
      })
    });
    e = h.findOne(".modal.show");
    e && xi.getInstance(e).hide(), xi.getOrCreateInstance(t).toggle(this)
  }), pe(xi), e(xi);
  const _i = "showing",
    Ei = ".offcanvas.show",
    Ti = "hidePrevented.bs.offcanvas",
    Ci = "hidden.bs.offcanvas",
    Si = {
      backdrop: !0,
      keyboard: !0,
      scroll: !1
    },
    Mi = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      scroll: "boolean"
    };
  class z extends t {
    constructor(e, t) {
      super(e, t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
    }
    static get Default() {
      return Si
    }
    static get DefaultType() {
      return Mi
    }
    static get NAME() {
      return "offcanvas"
    }
    toggle(e) {
      return this._isShown ? this.hide() : this.show(e)
    }
    show(e) {
      this._isShown || f.trigger(this._element, "show.bs.offcanvas", {
        relatedTarget: e
      }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new ai).hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(_i), this._queueCallback(() => {
        this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add("show"), this._element.classList.remove(_i), f.trigger(this._element, "shown.bs.offcanvas", {
          relatedTarget: e
        })
      }, this._element, !0))
    }
    hide() {
      !this._isShown || f.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add("hiding"), this._backdrop.hide(), this._queueCallback(() => {
        this._element.classList.remove("show", "hiding"), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || (new ai).reset(), f.trigger(this._element, Ci)
      }, this._element, !0))
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
    }
    _initializeBackDrop() {
      var e = Boolean(this._config.backdrop);
      return new di({
        className: "offcanvas-backdrop",
        isVisible: e,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: e ? () => {
          "static" !== this._config.backdrop ? this.hide() : f.trigger(this._element, Ti)
        } : null
      })
    }
    _initializeFocusTrap() {
      return new fi({
        trapElement: this._element
      })
    }
    _addEventListeners() {
      f.on(this._element, "keydown.dismiss.bs.offcanvas", e => {
        "Escape" === e.key && (this._config.keyboard ? this.hide() : f.trigger(this._element, Ti))
      })
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = z.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
          e[t](this)
        }
      })
    }
  }
  f.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', function (e) {
    var t = h.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(), a(this) || (f.one(t, Ci, () => {
      n(this) && this.focus()
    }), (e = h.findOne(Ei)) && e !== t && z.getInstance(e).hide(), z.getOrCreateInstance(t).toggle(this))
  }), f.on(window, "load.bs.offcanvas.data-api", () => {
    for (const e of h.find(Ei)) z.getOrCreateInstance(e).show()
  }), f.on(window, "resize.bs.offcanvas", () => {
    for (const e of h.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(e).position && z.getOrCreateInstance(e).hide()
  }), pe(z), e(z);
  const ki = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
    Ai = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
    Oi = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    Pi = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "srcset", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
    },
    Li = {
      allowList: Pi,
      content: {},
      extraClass: "",
      html: !1,
      sanitize: !0,
      sanitizeFn: null,
      template: "<div></div>"
    },
    $i = {
      allowList: "object",
      content: "object",
      extraClass: "(string|function)",
      html: "boolean",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      template: "string"
    },
    Ii = {
      entry: "(string|element|function|null)",
      selector: "(string|element)"
    };
  class zi extends ce {
    constructor(e) {
      super(), this._config = this._getConfig(e)
    }
    static get Default() {
      return Li
    }
    static get DefaultType() {
      return $i
    }
    static get NAME() {
      return "TemplateFactory"
    }
    getContent() {
      return Object.values(this._config.content).map(e => this._resolvePossibleFunction(e)).filter(Boolean)
    }
    hasContent() {
      return 0 < this.getContent().length
    }
    changeContent(e) {
      return this._checkContent(e), this._config.content = {
        ...this._config.content,
        ...e
      }, this
    }
    toHtml() {
      var e = document.createElement("div");
      e.innerHTML = this._maybeSanitize(this._config.template);
      for (const [t, i] of Object.entries(this._config.content)) this._setContent(e, i, t);
      const t = e.children[0],
        i = this._resolvePossibleFunction(this._config.extraClass);
      return i && t.classList.add(...i.split(" ")), t
    }
    _typeCheckConfig(e) {
      super._typeCheckConfig(e), this._checkContent(e.content)
    }
    _checkContent(e) {
      for (var [t, i] of Object.entries(e)) super._typeCheckConfig({
        selector: t,
        entry: i
      }, Ii)
    }
    _setContent(e, t, i) {
      i = h.findOne(i, e);
      i && ((t = this._resolvePossibleFunction(t)) ? r(t) ? this._putElementInTemplate(s(t), i) : this._config.html ? i.innerHTML = this._maybeSanitize(t) : i.textContent = t : i.remove())
    }
    _maybeSanitize(e) {
      if (this._config.sanitize) {
        var t = e,
          i = this._config.allowList,
          s = this._config.sanitizeFn;
        if (!t.length) return t;
        if (s && "function" == typeof s) return s(t);
        const n = (new window.DOMParser).parseFromString(t, "text/html"),
          a = [].concat(...n.body.querySelectorAll("*"));
        for (const t of a) {
          const s = t.nodeName.toLowerCase();
          if (Object.keys(i).includes(s)) {
            const n = [].concat(...t.attributes),
              a = [].concat(i["*"] || [], i[s] || []);
            for (const i of n)((e, t) => {
              const i = e.nodeName.toLowerCase();
              return t.includes(i) ? !ki.has(i) || Boolean(Ai.test(e.nodeValue) || Oi.test(e.nodeValue)) : t.filter(e => e instanceof RegExp).some(e => e.test(i))
            })(i, a) || t.removeAttribute(i.nodeName)
          } else t.remove()
        }
        return n.body.innerHTML
      }
      return e
    }
    _resolvePossibleFunction(e) {
      return l(e, [this])
    }
    _putElementInTemplate(e, t) {
      this._config.html ? (t.innerHTML = "", t.append(e)) : t.textContent = e.textContent
    }
  }
  const Di = new Set(["sanitize", "allowList", "sanitizeFn"]),
    Ni = "fade",
    ji = "show",
    Hi = "hide.bs.modal",
    Bi = "hover",
    qi = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: o() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: o() ? "right" : "left"
    },
    Xi = {
      allowList: Pi,
      animation: !0,
      boundary: "clippingParents",
      container: !1,
      customClass: "",
      delay: 0,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      html: !1,
      offset: [0, 0],
      placement: "top",
      popperConfig: null,
      sanitize: !0,
      sanitizeFn: null,
      selector: !1,
      template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: "",
      trigger: "hover focus"
    },
    Yi = {
      allowList: "object",
      animation: "boolean",
      boundary: "(string|element)",
      container: "(string|element|boolean)",
      customClass: "(string|function)",
      delay: "(number|object)",
      fallbackPlacements: "array",
      html: "boolean",
      offset: "(array|string|function)",
      placement: "(string|function)",
      popperConfig: "(null|object|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      selector: "(string|boolean)",
      template: "string",
      title: "(string|element|function)",
      trigger: "string"
    };
  class Wi extends t {
    constructor(e, t) {
      if (void 0 === Bt) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
      super(e, t), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
    }
    static get Default() {
      return Xi
    }
    static get DefaultType() {
      return Yi
    }
    static get NAME() {
      return "tooltip"
    }
    enable() {
      this._isEnabled = !0
    }
    disable() {
      this._isEnabled = !1
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled
    }
    toggle() {
      this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter())
    }
    dispose() {
      clearTimeout(this._timeout), f.off(this._element.closest(".modal"), Hi, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
    }
    show() {
      if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
      if (this._isWithContent() && this._isEnabled) {
        const i = f.trigger(this._element, this.constructor.eventName("show")),
          s = (H(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
        if (!i.defaultPrevented && s) {
          this._disposePopper();
          var e = this._getTipElement(),
            t = (this._element.setAttribute("aria-describedby", e.getAttribute("id")), this._config)["container"];
          if (this._element.ownerDocument.documentElement.contains(this.tip) || (t.append(e), f.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(e), e.classList.add(ji), "ontouchstart" in document.documentElement)
            for (const i of [].concat(...document.body.children)) f.on(i, "mouseover", B);
          this._queueCallback(() => {
            f.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), this._isHovered = !1
          }, this.tip, this._isAnimated())
        }
      }
    }
    hide() {
      if (this._isShown() && !f.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
        if (this._getTipElement().classList.remove(ji), "ontouchstart" in document.documentElement)
          for (const e of [].concat(...document.body.children)) f.off(e, "mouseover", B);
        this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, this._isHovered = null, this._queueCallback(() => {
          this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), f.trigger(this._element, this.constructor.eventName("hidden")))
        }, this.tip, this._isAnimated())
      }
    }
    update() {
      this._popper && this._popper.update()
    }
    _isWithContent() {
      return Boolean(this._getTitle())
    }
    _getTipElement() {
      return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
    }
    _createTipElement(e) {
      e = this._getTemplateFactory(e).toHtml();
      if (!e) return null;
      e.classList.remove(Ni, ji), e.classList.add(`bs-${this.constructor.NAME}-auto`);
      var t = (e => {
        for (; e += Math.floor(1e6 * Math.random()), document.getElementById(e););
        return e
      })(this.constructor.NAME).toString();
      return e.setAttribute("id", t), this._isAnimated() && e.classList.add(Ni), e
    }
    setContent(e) {
      this._newContent = e, this._isShown() && (this._disposePopper(), this.show())
    }
    _getTemplateFactory(e) {
      return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new zi({
        ...this._config,
        content: e,
        extraClass: this._resolvePossibleFunction(this._config.customClass)
      }), this._templateFactory
    }
    _getContentForTemplate() {
      return {
        ".tooltip-inner": this._getTitle()
      }
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
    }
    _initializeOnDelegatedTarget(e) {
      return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig())
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(Ni)
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(ji)
    }
    _createPopper(e) {
      var t = l(this._config.placement, [this, e, this._element]),
        t = qi[t.toUpperCase()];
      return Ht(this._element, e, this._getPopperConfig(t))
    }
    _getOffset() {
      const t = this._config["offset"];
      return "string" == typeof t ? t.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof t ? e => t(e, this._element) : t
    }
    _resolvePossibleFunction(e) {
      return l(e, [this._element])
    }
    _getPopperConfig(e) {
      e = {
        placement: e,
        modifiers: [{
          name: "flip",
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }, {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: "arrow",
          options: {
            element: `.${this.constructor.NAME}-arrow`
          }
        }, {
          name: "preSetPlacement",
          enabled: !0,
          phase: "beforeMain",
          fn: e => {
            this._getTipElement().setAttribute("data-popper-placement", e.state.placement)
          }
        }]
      };
      return {
        ...e,
        ...l(this._config.popperConfig, [e])
      }
    }
    _setListeners() {
      const e = this._config.trigger.split(" ");
      for (const t of e)
        if ("click" === t) f.on(this._element, this.constructor.eventName("click"), this._config.selector, e => {
          this._initializeOnDelegatedTarget(e).toggle()
        });
        else if ("manual" !== t) {
        const e = t === Bi ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
          i = t === Bi ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
        f.on(this._element, e, this._config.selector, e => {
          var t = this._initializeOnDelegatedTarget(e);
          t._activeTrigger["focusin" === e.type ? "focus" : Bi] = !0, t._enter()
        }), f.on(this._element, i, this._config.selector, e => {
          var t = this._initializeOnDelegatedTarget(e);
          t._activeTrigger["focusout" === e.type ? "focus" : Bi] = t._element.contains(e.relatedTarget), t._leave()
        })
      }
      this._hideModalHandler = () => {
        this._element && this.hide()
      }, f.on(this._element.closest(".modal"), Hi, this._hideModalHandler)
    }
    _fixTitle() {
      var e = this._element.getAttribute("title");
      e && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"))
    }
    _enter() {
      this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout(() => {
        this._isHovered && this.show()
      }, this._config.delay.show))
    }
    _leave() {
      this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => {
        this._isHovered || this.hide()
      }, this._config.delay.hide))
    }
    _setTimeout(e, t) {
      clearTimeout(this._timeout), this._timeout = setTimeout(e, t)
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(!0)
    }
    _getConfig(e) {
      var t = c.getDataAttributes(this._element);
      for (const e of Object.keys(t)) Di.has(e) && delete t[e];
      return e = {
        ...t,
        ..."object" == typeof e && e ? e : {}
      }, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e
    }
    _configAfterMerge(e) {
      return e.container = !1 === e.container ? document.body : s(e.container), "number" == typeof e.delay && (e.delay = {
        show: e.delay,
        hide: e.delay
      }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), e
    }
    _getDelegateConfig() {
      var e, t, i = {};
      for ([e, t] of Object.entries(this._config)) this.constructor.Default[e] !== t && (i[e] = t);
      return i.selector = !1, i.trigger = "manual", i
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null)
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = Wi.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]()
        }
      })
    }
  }
  e(Wi);
  const Fi = {
      ...Wi.Default,
      content: "",
      offset: [0, 8],
      placement: "right",
      template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      trigger: "click"
    },
    Ri = {
      ...Wi.DefaultType,
      content: "(null|string|element|function)"
    };
  class Vi extends Wi {
    static get Default() {
      return Fi
    }
    static get DefaultType() {
      return Ri
    }
    static get NAME() {
      return "popover"
    }
    _isWithContent() {
      return this._getTitle() || this._getContent()
    }
    _getContentForTemplate() {
      return {
        ".popover-header": this._getTitle(),
        ".popover-body": this._getContent()
      }
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content)
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = Vi.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]()
        }
      })
    }
  }
  e(Vi);
  const Gi = "click.bs.scrollspy",
    Ui = "active",
    Ki = {
      offset: null,
      rootMargin: "0px 0px -25%",
      smoothScroll: !1,
      target: null,
      threshold: [.1, .5, 1]
    },
    Qi = {
      offset: "(number|null)",
      rootMargin: "string",
      smoothScroll: "boolean",
      target: "element",
      threshold: "array"
    };
  class Zi extends t {
    constructor(e, t) {
      super(e, t), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0
      }, this.refresh()
    }
    static get Default() {
      return Ki
    }
    static get DefaultType() {
      return Qi
    }
    static get NAME() {
      return "scrollspy"
    }
    refresh() {
      this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
      for (const e of this._observableSections.values()) this._observer.observe(e)
    }
    dispose() {
      this._observer.disconnect(), super.dispose()
    }
    _configAfterMerge(e) {
      return e.target = s(e.target) || document.body, e.rootMargin = e.offset ? e.offset + "px 0px -30%" : e.rootMargin, "string" == typeof e.threshold && (e.threshold = e.threshold.split(",").map(e => Number.parseFloat(e))), e
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll && (f.off(this._config.target, Gi), f.on(this._config.target, Gi, "[href]", e => {
        var t = this._observableSections.get(e.target.hash);
        t && (e.preventDefault(), e = this._rootElement || window, t = t.offsetTop - this._element.offsetTop, e.scrollTo ? e.scrollTo({
          top: t,
          behavior: "smooth"
        }) : e.scrollTop = t)
      }))
    }
    _getNewObserver() {
      var e = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(e => this._observerCallback(e), e)
    }
    _observerCallback(e) {
      const t = e => this._targetLinks.get("#" + e.target.id),
        i = e => {
          this._previousScrollData.visibleEntryTop = e.target.offsetTop, this._process(t(e))
        },
        s = (this._rootElement || document.documentElement).scrollTop,
        n = s >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = s;
      for (const a of e)
        if (a.isIntersecting) {
          const e = a.target.offsetTop >= this._previousScrollData.visibleEntryTop;
          if (n && e) {
            if (i(a), !s) return
          } else n || e || i(a)
        } else this._activeTarget = null, this._clearActiveClass(t(a))
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = new Map, this._observableSections = new Map;
      const e = h.find("[href]", this._config.target);
      for (const t of e)
        if (t.hash && !a(t)) {
          const e = h.findOne(t.hash, this._element);
          n(e) && (this._targetLinks.set(t.hash, t), this._observableSections.set(t.hash, e))
        }
    }
    _process(e) {
      this._activeTarget !== e && (this._clearActiveClass(this._config.target), (this._activeTarget = e).classList.add(Ui), this._activateParents(e), f.trigger(this._element, "activate.bs.scrollspy", {
        relatedTarget: e
      }))
    }
    _activateParents(e) {
      if (e.classList.contains("dropdown-item")) h.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(Ui);
      else
        for (const t of h.parents(e, ".nav, .list-group"))
          for (const e of h.prev(t, ".nav-link, .nav-item > .nav-link, .list-group-item")) e.classList.add(Ui)
    }
    _clearActiveClass(e) {
      e.classList.remove(Ui);
      var t = h.find("[href].active", e);
      for (const e of t) e.classList.remove(Ui)
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = Zi.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
          e[t]()
        }
      })
    }
  }
  f.on(window, "load.bs.scrollspy.data-api", () => {
    for (const e of h.find('[data-bs-spy="scroll"]')) Zi.getOrCreateInstance(e)
  }), e(Zi);
  const Ji = "ArrowRight",
    es = "ArrowDown",
    ts = "active",
    is = "show",
    ss = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    ns = '.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ' + ss;
  class as extends t {
    constructor(e) {
      super(e), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), f.on(this._element, "keydown.bs.tab", e => this._keydown(e)))
    }
    static get NAME() {
      return "tab"
    }
    show() {
      var e, t, i = this._element;
      this._elemIsActive(i) || (t = (e = this._getActiveElem()) ? f.trigger(e, "hide.bs.tab", {
        relatedTarget: i
      }) : null, f.trigger(i, "show.bs.tab", {
        relatedTarget: e
      }).defaultPrevented) || t && t.defaultPrevented || (this._deactivate(e, i), this._activate(i, e))
    }
    _activate(e, t) {
      e && (e.classList.add(ts), this._activate(h.getElementFromSelector(e)), this._queueCallback(() => {
        "tab" === e.getAttribute("role") ? (e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), f.trigger(e, "shown.bs.tab", {
          relatedTarget: t
        })) : e.classList.add(is)
      }, e, e.classList.contains("fade")))
    }
    _deactivate(e, t) {
      e && (e.classList.remove(ts), e.blur(), this._deactivate(h.getElementFromSelector(e)), this._queueCallback(() => {
        "tab" === e.getAttribute("role") ? (e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), f.trigger(e, "hidden.bs.tab", {
          relatedTarget: t
        })) : e.classList.remove(is)
      }, e, e.classList.contains("fade")))
    }
    _keydown(e) {
      var t;
      ["ArrowLeft", Ji, "ArrowUp", es].includes(e.key) && (e.stopPropagation(), e.preventDefault(), t = [Ji, es].includes(e.key), e = F(this._getChildren().filter(e => !a(e)), e.target, t, !0)) && (e.focus({
        preventScroll: !0
      }), as.getOrCreateInstance(e).show())
    }
    _getChildren() {
      return h.find(ns, this._parent)
    }
    _getActiveElem() {
      return this._getChildren().find(e => this._elemIsActive(e)) || null
    }
    _setInitialAttributes(e, t) {
      this._setAttributeIfNotExists(e, "role", "tablist");
      for (const e of t) this._setInitialAttributesOnChild(e)
    }
    _setInitialAttributesOnChild(e) {
      e = this._getInnerElement(e);
      var t = this._elemIsActive(e),
        i = this._getOuterElement(e);
      e.setAttribute("aria-selected", t), i !== e && this._setAttributeIfNotExists(i, "role", "presentation"), t || e.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(e, "role", "tab"), this._setInitialAttributesOnTargetPanel(e)
    }
    _setInitialAttributesOnTargetPanel(e) {
      var t = h.getElementFromSelector(e);
      t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id) && this._setAttributeIfNotExists(t, "aria-labelledby", "#" + e.id)
    }
    _toggleDropDown(e, i) {
      const s = this._getOuterElement(e);
      s.classList.contains("dropdown") && ((e = (e, t) => {
        e = h.findOne(e, s);
        e && e.classList.toggle(t, i)
      })(".dropdown-toggle", ts), e(".dropdown-menu", is), s.setAttribute("aria-expanded", i))
    }
    _setAttributeIfNotExists(e, t, i) {
      e.hasAttribute(t) || e.setAttribute(t, i)
    }
    _elemIsActive(e) {
      return e.classList.contains(ts)
    }
    _getInnerElement(e) {
      return e.matches(ns) ? e : h.findOne(ns, e)
    }
    _getOuterElement(e) {
      return e.closest(".nav-item, .list-group-item") || e
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = as.getOrCreateInstance(this);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
          e[t]()
        }
      })
    }
  }
  f.on(document, "click.bs.tab", ss, function (e) {
    ["A", "AREA"].includes(this.tagName) && e.preventDefault(), a(this) || as.getOrCreateInstance(this).show()
  }), f.on(window, "load.bs.tab", () => {
    for (const e of h.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]')) as.getOrCreateInstance(e)
  }), e(as);
  const rs = "show",
    os = "showing",
    ls = {
      animation: "boolean",
      autohide: "boolean",
      delay: "number"
    },
    ds = {
      animation: !0,
      autohide: !0,
      delay: 5e3
    };
  class cs extends t {
    constructor(e, t) {
      super(e, t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
    }
    static get Default() {
      return ds
    }
    static get DefaultType() {
      return ls
    }
    static get NAME() {
      return "toast"
    }
    show() {
      f.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), q(this._element), this._element.classList.add(rs, os), this._queueCallback(() => {
        this._element.classList.remove(os), f.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
      }, this._element, this._config.animation))
    }
    hide() {
      !this.isShown() || f.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add(os), this._queueCallback(() => {
        this._element.classList.add("hide"), this._element.classList.remove(os, rs), f.trigger(this._element, "hidden.bs.toast")
      }, this._element, this._config.animation))
    }
    dispose() {
      this._clearTimeout(), this.isShown() && this._element.classList.remove(rs), super.dispose()
    }
    isShown() {
      return this._element.classList.contains(rs)
    }
    _maybeScheduleHide() {
      !this._config.autohide || this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
        this.hide()
      }, this._config.delay))
    }
    _onInteraction(e, t) {
      switch (e.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = t;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = t
      }
      t ? this._clearTimeout() : (e = e.relatedTarget, this._element === e || this._element.contains(e) || this._maybeScheduleHide())
    }
    _setListeners() {
      f.on(this._element, "mouseover.bs.toast", e => this._onInteraction(e, !0)), f.on(this._element, "mouseout.bs.toast", e => this._onInteraction(e, !1)), f.on(this._element, "focusin.bs.toast", e => this._onInteraction(e, !0)), f.on(this._element, "focusout.bs.toast", e => this._onInteraction(e, !1))
    }
    _clearTimeout() {
      clearTimeout(this._timeout), this._timeout = null
    }
    static jQueryInterface(t) {
      return this.each(function () {
        var e = cs.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t](this)
        }
      })
    }
  }
  return pe(cs), e(cs), {
    Alert: ue,
    Button: me,
    Carousel: Me,
    Collapse: Ie,
    Dropdown: m,
    Modal: xi,
    Offcanvas: z,
    Popover: Vi,
    ScrollSpy: Zi,
    Tab: as,
    Toast: cs,
    Tooltip: Wi
  }
}),
function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.counterUp = t() : e.counterUp = t()
}(self, function () {
  return (() => {
    "use strict";
    var s = {
        d: (e, t) => {
          for (var i in t) s.o(t, i) && !s.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
          })
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: e => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(e, "__esModule", {
            value: !0
          })
        }
      },
      e = {};
    s.r(e), s.d(e, {
      default: () => t,
      divideNumbers: () => l
    });
    const t = (e, t = {}) => {
        const {
          action: i = "start",
          duration: s = 1e3,
          delay: n = 16
        } = t;
        if ("stop" === i) o(e);
        else if (o(e), /[0-9]/.test(e.innerHTML)) {
          const a = l(e.innerHTML, {
              duration: s || e.getAttribute("data-duration"),
              delay: n || e.getAttribute("data-delay")
            }),
            r = (e._countUpOrigInnerHTML = e.innerHTML, e.innerHTML = a[0] || "&nbsp;", e.style.visibility = "visible", function () {
              e.innerHTML = a.shift() || "&nbsp;", a.length ? (clearTimeout(e.countUpTimeout), e.countUpTimeout = setTimeout(r, n)) : e._countUpOrigInnerHTML = void 0
            });
          e.countUpTimeout = setTimeout(r, n)
        }
      },
      o = e => {
        clearTimeout(e.countUpTimeout), e._countUpOrigInnerHTML && (e.innerHTML = e._countUpOrigInnerHTML, e._countUpOrigInnerHTML = void 0), e.style.visibility = ""
      },
      l = (e, t = {}) => {
        const {
          duration: n = 1e3,
          delay: i = 16
        } = t, a = n / i, r = e.toString().split(/(<[^>]+>|[0-9.][,.0-9]*[0-9]*)/), o = [];
        for (let e = 0; e < a; e++) o.push("");
        for (let t = 0; t < r.length; t++)
          if (/([0-9.][,.0-9]*[0-9]*)/.test(r[t]) && !/<[^>]+>/.test(r[t])) {
            let i = r[t];
            const n = [...i.matchAll(/[.,]/g)].map(e => ({
              char: e[0],
              i: i.length - e.index - 1
            })).sort((e, t) => e.i - t.i);
            i = i.replace(/[.,]/g, "");
            let s = o.length - 1;
            for (let t = a; 1 <= t; t--) {
              let e = parseInt(i / a * t, 10);
              e = n.reduce((e, {
                char: t,
                i
              }) => e.length <= i ? e : e.slice(0, -i) + t + e.slice(-i), e.toString()), o[s--] += e
            }
          } else
            for (let e = 0; e < a; e++) o[e] += r[t];
        return o[o.length] = e.toString(), o
      };
    return e
  })()
}),
function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).GLightbox = t()
}(this, function () {
  "use strict";

  function t(e) {
    return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
      return typeof e
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
  }

  function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }

  function s(e, t) {
    for (var i = 0; i < t.length; i++) {
      var s = t[i];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
    }
  }

  function e(e, t, i) {
    t && s(e.prototype, t), i && s(e, i)
  }
  var o = Date.now();

  function d(e) {
    var t = {},
      i = !0,
      s = 0,
      n = arguments.length;
    "[object Boolean]" === Object.prototype.toString.call(e) && (i = e, s++);
    for (; s < n; s++) {
      a = void 0;
      var a, r = arguments[s];
      for (a in r) Object.prototype.hasOwnProperty.call(r, a) && (i && "[object Object]" === Object.prototype.toString.call(r[a]) ? t[a] = d(!0, t[a], r[a]) : t[a] = r[a])
    }
    return t
  }

  function p(e, t) {
    if (0 != A(e = k(e = !q(e) && e !== window && e !== document ? e : [e]) || c(e) ? e : [e]))
      if (k(e) && !c(e))
        for (var i = e.length, s = 0; s < i && !1 !== t.call(e[s], e[s], s, e); s++);
      else if (c(e))
      for (var n in e)
        if (w(e, n) && !1 === t.call(e[n], e[n], n, e)) break
  }

  function T(e, t, i) {
    var s = 1 < arguments.length && void 0 !== t ? t : null,
      n = 2 < arguments.length && void 0 !== i ? i : null,
      t = e[o] = e[o] || [],
      a = {
        all: t,
        evt: null,
        found: null
      };
    return s && n && 0 < A(t) && p(t, function (e, t) {
      if (e.eventName == s && e.fn.toString() == n.toString()) return a.found = !0, a.evt = t, !1
    }), a
  }

  function $(i, e, t) {
    var e = 1 < arguments.length && void 0 !== e ? e : {},
      s = e.onElement,
      n = e.withCallback,
      a = e.avoidDuplicate,
      r = void 0 === a || a,
      a = e.once,
      o = void 0 !== a && a,
      a = e.useCapture,
      l = void 0 !== a && a,
      d = 2 < arguments.length ? t : void 0,
      c = s || [];

    function h(e) {
      B(n) && n.call(d, e, this), o && h.destroy()
    }
    return y(c) && (c = document.querySelectorAll(c)), h.destroy = function () {
      p(c, function (e) {
        var t = T(e, i, h);
        t.found && t.all.splice(t.evt, 1), e.removeEventListener && e.removeEventListener(i, h, l)
      })
    }, p(c, function (e) {
      var t = T(e, i, h);
      (e.addEventListener && r && !t.found || !r) && (e.addEventListener(i, h, l), t.all.push({
        eventName: i,
        fn: h
      }))
    }), h
  }

  function I(t, e) {
    p(e.split(" "), function (e) {
      return t.classList.add(e)
    })
  }

  function z(t, e) {
    p(e.split(" "), function (e) {
      return t.classList.remove(e)
    })
  }

  function D(e, t) {
    return e.classList.contains(t)
  }

  function N(e, t) {
    for (; e !== document.body;) {
      if (!(e = e.parentElement)) return !1;
      if ("function" == typeof e.matches ? e.matches(t) : e.msMatchesSelector(t)) return e
    }
  }

  function j(t, e, i) {
    var s, e = 1 < arguments.length && void 0 !== e ? e : "",
      n = 2 < arguments.length && void 0 !== i && i;
    if (t && "" !== e) return "none" === e ? B(n) && n() : (i = function () {
      var e, t = document.createElement("fakeelement"),
        i = {
          animation: "animationend",
          OAnimation: "oAnimationEnd",
          MozAnimation: "animationend",
          WebkitAnimation: "webkitAnimationEnd"
        };
      for (e in i)
        if (void 0 !== t.style[e]) return i[e]
    }(), p(s = e.split(" "), function (e) {
      I(t, "g" + e)
    }), void $(i, {
      onElement: t,
      avoidDuplicate: !1,
      once: !0,
      withCallback: function (e, t) {
        p(s, function (e) {
          z(t, "g" + e)
        }), B(n) && n()
      }
    }))
  }

  function H(e, t) {
    t = 1 < arguments.length && void 0 !== t ? t : "";
    if ("" === t) return e.style.webkitTransform = "", e.style.MozTransform = "", e.style.msTransform = "", e.style.OTransform = "", e.style.transform = "", !1;
    e.style.webkitTransform = t, e.style.MozTransform = t, e.style.msTransform = t, e.style.OTransform = t, e.style.transform = t
  }

  function C(e) {
    e.style.display = "block"
  }

  function l(e) {
    e.style.display = "none"
  }

  function g(e) {
    var t = document.createDocumentFragment(),
      i = document.createElement("div");
    for (i.innerHTML = e; i.firstChild;) t.appendChild(i.firstChild);
    return t
  }

  function F() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
  }

  function v(e, t, i, s) {
    var n, a;
    e() ? t() : (i = i || 100, a = setInterval(function () {
      e() && (clearInterval(a), n && clearTimeout(n), t())
    }, i), s && (n = setTimeout(function () {
      clearInterval(a)
    }, s)))
  }

  function S(e, t, i) {
    if (X(e)) console.error("Inject assets error");
    else if (B(t) && (i = t, t = !1), y(t) && t in window) B(i) && i();
    else {
      var s, n, a;
      if (-1 !== e.indexOf(".css")) return (s = document.querySelectorAll('link[href="' + e + '"]')) && 0 < s.length || (r = (n = document.getElementsByTagName("head")[0]).querySelectorAll('link[rel="stylesheet"]'), (a = document.createElement("link")).rel = "stylesheet", a.type = "text/css", a.href = e, a.media = "all", r ? n.insertBefore(a, r[0]) : n.appendChild(a)), B(i) && i();
      if ((s = document.querySelectorAll('script[src="' + e + '"]')) && 0 < s.length) {
        if (B(i)) {
          if (y(t)) return v(function () {
            return void 0 !== window[t]
          }, function () {
            i()
          });
          i()
        }
      } else {
        var r = document.createElement("script");
        r.type = "text/javascript", r.src = e, r.onload = function () {
          if (B(i)) {
            if (y(t)) return v(function () {
              return void 0 !== window[t]
            }, function () {
              i()
            }), !1;
            i()
          }
        }, document.body.appendChild(r)
      }
    }
  }

  function b() {
    return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i)
  }

  function B(e) {
    return "function" == typeof e
  }

  function y(e) {
    return "string" == typeof e
  }

  function q(e) {
    return e && e.nodeType && 1 == e.nodeType
  }

  function M(e) {
    return Array.isArray(e)
  }

  function k(e) {
    return e && e.length && isFinite(e.length)
  }

  function c(e) {
    return "object" === t(e) && null != e && !B(e) && !M(e)
  }

  function X(e) {
    return null == e
  }

  function w(e, t) {
    return null !== e && hasOwnProperty.call(e, t)
  }

  function A(e) {
    if (c(e)) {
      if (e.keys) return e.keys().length;
      var t, i = 0;
      for (t in e) w(e, t) && i++;
      return i
    }
    return e.length
  }

  function Y(e) {
    return !isNaN(parseFloat(e)) && isFinite(e)
  }

  function R(e) {
    var e = 0 < arguments.length && void 0 !== e ? e : -1,
      t = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
    if (!t.length) return !1;
    if (1 == t.length) return t[0];
    "string" == typeof e && (e = parseInt(e));
    var i = [],
      t = (p(t, function (e) {
        i.push(e.getAttribute("data-taborder"))
      }), Math.max.apply(Math, i.map(function (e) {
        return parseInt(e)
      }))),
      s = e < 0 ? 1 : e + 1;
    t < s && (s = "1");
    e = i.filter(function (e) {
      return e >= parseInt(s)
    }).sort()[0];
    return document.querySelector('.gbtn[data-taborder="'.concat(e, '"]'))
  }

  function u(e) {
    return Math.sqrt(e.x * e.x + e.y * e.y)
  }
  e(i, [{
    key: "add",
    value: function (e) {
      this.handlers.push(e)
    }
  }, {
    key: "del",
    value: function (e) {
      e || (this.handlers = []);
      for (var t = this.handlers.length; 0 <= t; t--) this.handlers[t] === e && this.handlers.splice(t, 1)
    }
  }, {
    key: "dispatch",
    value: function () {
      for (var e = 0, t = this.handlers.length; e < t; e++) {
        var i = this.handlers[e];
        "function" == typeof i && i.apply(this.el, arguments)
      }
    }
  }]);
  var O = i;

  function i(e) {
    r(this, i), this.handlers = [], this.el = e
  }

  function n(e, t) {
    e = new O(e);
    return e.add(t), e
  }
  e(a, [{
    key: "start",
    value: function (e) {
      var t, i;
      e.touches && (e.target && e.target.nodeName && 0 <= ["a", "button", "input"].indexOf(e.target.nodeName.toLowerCase()) ? console.log("ignore drag for this touched element", e.target.nodeName.toLowerCase()) : (this.now = Date.now(), this.x1 = e.touches[0].pageX, this.y1 = e.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(e, this.element), null !== this.preTapPosition.x && (this.isDoubleTap = 0 < this.delta && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap) && clearTimeout(this.singleTapTimeout), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now, t = this.preV, 1 < e.touches.length && (this._cancelLongTap(), this._cancelSingleTap(), i = {
        x: e.touches[1].pageX - this.x1,
        y: e.touches[1].pageY - this.y1
      }, t.x = i.x, t.y = i.y, this.pinchStartLen = u(t), this.multipointStart.dispatch(e, this.element)), this._preventTap = !1, this.longTapTimeout = setTimeout(function () {
        this.longTap.dispatch(e, this.element), this._preventTap = !0
      }.bind(this), 750)))
    }
  }, {
    key: "move",
    value: function (e) {
      var t, i, s, n, a, r, o, l, d, c, h, p;
      e.touches && (t = this.preV, i = e.touches.length, s = e.touches[0].pageX, n = e.touches[0].pageY, this.isDoubleTap = !1, 1 < i ? (a = e.touches[1].pageX, r = e.touches[1].pageY, o = {
        x: e.touches[1].pageX - s,
        y: e.touches[1].pageY - n
      }, null !== t.x && (0 < this.pinchStartLen && (e.zoom = u(o) / this.pinchStartLen, this.pinch.dispatch(e, this.element)), e.angle = (p = d = t, p = 0 == (h = u(c = l = o) * u(p)) ? 0 : (1 < (c = (c.x * p.x + c.y * p.y) / h) && (c = 1), Math.acos(c)), 0 < l.x * d.y - d.x * l.y && (p *= -1), 180 * p / Math.PI), this.rotate.dispatch(e, this.element)), t.x = o.x, t.y = o.y, null !== this.x2 && null !== this.sx2 ? (e.deltaX = (s - this.x2 + a - this.sx2) / 2, e.deltaY = (n - this.y2 + r - this.sy2) / 2) : (e.deltaX = 0, e.deltaY = 0), this.twoFingerPressMove.dispatch(e, this.element), this.sx2 = a, this.sy2 = r) : (null !== this.x2 ? (e.deltaX = s - this.x2, e.deltaY = n - this.y2, h = Math.abs(this.x1 - this.x2), c = Math.abs(this.y1 - this.y2), (10 < h || 10 < c) && (this._preventTap = !0)) : (e.deltaX = 0, e.deltaY = 0), this.pressMove.dispatch(e, this.element)), this.touchMove.dispatch(e, this.element), this._cancelLongTap(), this.x2 = s, this.y2 = n, 1 < i) && e.preventDefault()
    }
  }, {
    key: "end",
    value: function (e) {
      var t;
      e.changedTouches && (this._cancelLongTap(), t = this, e.touches.length < 2 && (this.multipointEnd.dispatch(e, this.element), this.sx2 = this.sy2 = null), this.x2 && 30 < Math.abs(this.x1 - this.x2) || this.y2 && 30 < Math.abs(this.y1 - this.y2) ? (e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout(function () {
        t.swipe.dispatch(e, t.element)
      }, 0)) : (this.tapTimeout = setTimeout(function () {
        t._preventTap || t.tap.dispatch(e, t.element), t.isDoubleTap && (t.doubleTap.dispatch(e, t.element), t.isDoubleTap = !1)
      }, 0), t.isDoubleTap || (t.singleTapTimeout = setTimeout(function () {
        t.singleTap.dispatch(e, t.element)
      }, 250))), this.touchEnd.dispatch(e, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null)
    }
  }, {
    key: "cancelAll",
    value: function () {
      this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout)
    }
  }, {
    key: "cancel",
    value: function (e) {
      this.cancelAll(), this.touchCancel.dispatch(e, this.element)
    }
  }, {
    key: "_cancelLongTap",
    value: function () {
      clearTimeout(this.longTapTimeout)
    }
  }, {
    key: "_cancelSingleTap",
    value: function () {
      clearTimeout(this.singleTapTimeout)
    }
  }, {
    key: "_swipeDirection",
    value: function (e, t, i, s) {
      return Math.abs(e - t) >= Math.abs(i - s) ? 0 < e - t ? "Left" : "Right" : 0 < i - s ? "Up" : "Down"
    }
  }, {
    key: "on",
    value: function (e, t) {
      this[e] && this[e].add(t)
    }
  }, {
    key: "off",
    value: function (e, t) {
      this[e] && this[e].del(t)
    }
  }, {
    key: "destroy",
    value: function () {
      return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null
    }
  }]);
  var V = a;

  function a(e, t) {
    r(this, a), this.element = "string" == typeof e ? document.querySelector(e) : e, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
      x: null,
      y: null
    }, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;

    function i() {}
    this.rotate = n(this.element, t.rotate || i), this.touchStart = n(this.element, t.touchStart || i), this.multipointStart = n(this.element, t.multipointStart || i), this.multipointEnd = n(this.element, t.multipointEnd || i), this.pinch = n(this.element, t.pinch || i), this.swipe = n(this.element, t.swipe || i), this.tap = n(this.element, t.tap || i), this.doubleTap = n(this.element, t.doubleTap || i), this.longTap = n(this.element, t.longTap || i), this.singleTap = n(this.element, t.singleTap || i), this.pressMove = n(this.element, t.pressMove || i), this.twoFingerPressMove = n(this.element, t.twoFingerPressMove || i), this.touchMove = n(this.element, t.touchMove || i), this.touchEnd = n(this.element, t.touchEnd || i), this.touchCancel = n(this.element, t.touchCancel || i), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
      x: null,
      y: null
    }
  }

  function W(e) {
    var t = function () {
        var e, t = document.createElement("fakeelement"),
          i = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
          };
        for (e in i)
          if (void 0 !== t.style[e]) return i[e]
      }(),
      i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      s = D(e, "gslide-media") ? e : e.querySelector(".gslide-media"),
      n = N(s, ".ginner-container"),
      e = e.querySelector(".gslide-description");
    I(s = 769 < i ? n : s, "greset"), H(s, "translate3d(0, 0, 0)"), $(t, {
      onElement: s,
      once: !0,
      withCallback: function (e, t) {
        z(s, "greset")
      }
    }), s.style.opacity = "", e && (e.style.opacity = "")
  }
  e(f, [{
    key: "zoomIn",
    value: function () {
      var e, t = this.widowWidth();
      this.zoomedIn || t <= 768 || ((e = this.img).setAttribute("data-style", e.getAttribute("style")), e.style.maxWidth = e.naturalWidth + "px", e.style.maxHeight = e.naturalHeight + "px", e.naturalWidth > t && (t = t / 2 - e.naturalWidth / 2, this.setTranslate(this.img.parentNode, t, 0)), this.slide.classList.add("zoomed"), this.zoomedIn = !0)
    }
  }, {
    key: "zoomOut",
    value: function () {
      this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && "function" == typeof this.onclose && this.onclose()
    }
  }, {
    key: "dragStart",
    value: function (e) {
      e.preventDefault(), this.zoomedIn ? ("touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset), e.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1
    }
  }, {
    key: "dragEnd",
    value: function (e) {
      var t = this;
      e.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout(function () {
        t.dragging = !1, t.img.isDragging = !1, t.img.classList.remove("dragging")
      }, 100)
    }
  }, {
    key: "drag",
    value: function (e) {
      this.active && (e.preventDefault(), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY))
    }
  }, {
    key: "onMove",
    value: function (e) {
      var t;
      this.zoomedIn && (t = e.clientX - this.img.naturalWidth / 2, e = e.clientY - this.img.naturalHeight / 2, this.setTranslate(this.img, t, e))
    }
  }, {
    key: "setTranslate",
    value: function (e, t, i) {
      e.style.transform = "translate3d(" + t + "px, " + i + "px, 0)"
    }
  }, {
    key: "widowWidth",
    value: function () {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    }
  }]);
  var P = f,
    L = (e(h, [{
      key: "dragStart",
      value: function (e) {
        var t;
        this.slide.classList.contains("zoomed") || ("touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset), t = e.target.nodeName.toLowerCase(), e.target.classList.contains("nodrag")) || N(e.target, ".nodrag") || -1 !== ["input", "select", "textarea", "button", "a"].indexOf(t) ? this.active = !1 : (e.preventDefault(), (e.target === this.el || "img" !== t && N(e.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = N(e.target, ".ginner-container")))
      }
    }, {
      key: "dragEnd",
      value: function (e) {
        var t = this;
        e && e.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, "right" == this.doSlideChange && this.instance.prevSlide(), "left" == this.doSlideChange) && this.instance.nextSlide(), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout(function () {
          t.instance.preventOutsideClick = !1, t.toleranceReached = !1, t.lastDirection = null, t.dragging = !1, t.el.isDragging = !1, t.el.classList.remove("dragging"), t.slide.classList.remove("dragging-nav"), t.dragContainer.style.transform = "", t.dragContainer.style.transition = ""
        }, 100)
      }
    }, {
      key: "drag",
      value: function (e) {
        if (this.active) {
          e.preventDefault(), this.slide.classList.add("dragging-nav"), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
          var e = Math.abs(this.currentX),
            t = Math.abs(this.currentY);
          if (0 < e && e >= Math.abs(this.currentY) && (!this.lastDirection || "x" == this.lastDirection)) {
            this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
            var i = this.shouldChange();
            if (!this.instance.settings.dragAutoSnap && i && (this.doSlideChange = i), this.instance.settings.dragAutoSnap && i) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), "right" == i && this.instance.prevSlide(), void("left" == i && this.instance.nextSlide())
          }
          0 < this.toleranceY && 0 < t && e <= t && (!this.lastDirection || "y" == this.lastDirection) && (this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY), i = this.shouldClose(), !this.instance.settings.dragAutoSnap && i && (this.doSlideClose = !0), this.instance.settings.dragAutoSnap) && i && this.instance.close()
        }
      }
    }, {
      key: "shouldChange",
      value: function () {
        var e, t = !1;
        return t = Math.abs(this.currentX) >= this.toleranceX && ("left" == (e = 0 < this.currentX ? "right" : "left") && this.slide !== this.slide.parentNode.lastChild || "right" == e && this.slide !== this.slide.parentNode.firstChild) ? e : t
      }
    }, {
      key: "shouldClose",
      value: function () {
        var e = !1;
        return e = Math.abs(this.currentY) >= this.toleranceY ? !0 : e
      }
    }, {
      key: "setTranslate",
      value: function (e, t, i) {
        e.style.transition = 3 < arguments.length && void 0 !== arguments[3] && arguments[3] ? "all .2s ease" : "", e.style.transform = "translate3d(".concat(t, "px, ").concat(i, "px, 0)")
      }
    }]), h);

  function h() {
    var t = this,
      e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      i = (r(this, h), e.dragEl),
      s = e.toleranceX,
      s = void 0 === s ? 40 : s,
      n = e.toleranceY,
      n = void 0 === n ? 65 : n,
      a = e.slide,
      a = void 0 === a ? null : a,
      e = e.instance,
      e = void 0 === e ? null : e;
    this.el = i, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = s, this.toleranceY = n, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = a, this.instance = e, this.el.addEventListener("mousedown", function (e) {
      return t.dragStart(e)
    }, !1), this.el.addEventListener("mouseup", function (e) {
      return t.dragEnd(e)
    }, !1), this.el.addEventListener("mousemove", function (e) {
      return t.drag(e)
    }, !1)
  }

  function f(e, t) {
    var i = this,
      s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (r(this, f), this.img = e, this.slide = t, this.onclose = s, this.img.setZoomEvents) return !1;
    this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", function (e) {
      return i.dragStart(e)
    }, !1), this.img.addEventListener("mouseup", function (e) {
      return i.dragEnd(e)
    }, !1), this.img.addEventListener("mousemove", function (e) {
      return i.drag(e)
    }, !1), this.img.addEventListener("click", function (e) {
      return i.slide.classList.contains("dragging-nav") ? (i.zoomOut(), !1) : i.zoomedIn ? void(i.zoomedIn && !i.dragging && i.zoomOut()) : i.zoomIn()
    }, !1), this.img.setZoomEvents = !0
  }

  function G(e) {
    var t = N(e.target, ".gslide-media");
    "enterfullscreen" === e.type && I(t, "fullscreen"), "exitfullscreen" === e.type && z(t, "fullscreen")
  }
  e(E, [{
    key: "sourceType",
    value: function (e) {
      var t = e;
      return null !== (e = e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/) ? "image" : e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) || e.match(/vimeo\.com\/([0-9]*)/) || null !== e.match(/\.(mp4|ogg|webm|mov)/) ? "video" : null !== e.match(/\.(mp3|wav|wma|aac|ogg)/) ? "audio" : -1 < e.indexOf("#") && "" !== t.split("#").pop().trim() ? "inline" : -1 < e.indexOf("goajax=true") ? "ajax" : "external"
    }
  }, {
    key: "parseConfig",
    value: function (s, n) {
      var a = this,
        r = d({
          descPosition: n.descPosition
        }, this.defaults);
      if (c(s) && !q(s)) return w(s, "type") || (w(s, "content") && s.content ? s.type = "inline" : w(s, "href") && (s.type = this.sourceType(s.href))), t = d(r, s), this.setSize(t, n), t;
      var o, e, t = "",
        l = s.getAttribute("data-glightbox"),
        i = s.nodeName.toLowerCase();
      if ("a" === i && (t = s.href), "img" === i && (t = s.src, r.alt = s.alt), r.href = t, p(r, function (e, t) {
          w(n, t) && "width" !== t && (r[t] = n[t]);
          var i = s.dataset[t];
          X(i) || (r[t] = a.sanitizeValue(i))
        }), r.content && (r.type = "inline"), !r.type && t && (r.type = this.sourceType(t)), X(l) ? (r.title || "a" != i || X(t = s.title) || "" === t || (r.title = t), r.title || "img" != i || X(t = s.alt) || "" === t || (r.title = t)) : (o = [], p(r, function (e, t) {
          o.push(";\\s?" + t)
        }), o = o.join("\\s?:|"), "" !== l.trim() && p(r, function (e, t) {
          var i = l,
            s = new RegExp("s?" + t + "s?:s?(.*?)(" + o + "s?:|$)"),
            i = i.match(s);
          i && i.length && i[1] && (s = i[1].trim().replace(/;\s*$/, ""), r[t] = a.sanitizeValue(s))
        })), r.description && "." === r.description.substring(0, 1)) {
        try {
          e = document.querySelector(r.description).innerHTML
        } catch (s) {
          if (!(s instanceof DOMException)) throw s
        }
        e && (r.description = e)
      }
      return r.description || (i = s.querySelector(".glightbox-desc")) && (r.description = i.innerHTML), this.setSize(r, n, s), this.slideConfig = r
    }
  }, {
    key: "setSize",
    value: function (e, t) {
      var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
        s = "video" == e.type ? this.checkSize(t.videosWidth) : this.checkSize(t.width),
        t = this.checkSize(t.height);
      return e.width = w(e, "width") && "" !== e.width ? this.checkSize(e.width) : s, e.height = w(e, "height") && "" !== e.height ? this.checkSize(e.height) : t, i && "image" == e.type && (e._hasCustomWidth = !!i.dataset.width, e._hasCustomHeight = !!i.dataset.height), e
    }
  }, {
    key: "checkSize",
    value: function (e) {
      return Y(e) ? "".concat(e, "px") : e
    }
  }, {
    key: "sanitizeValue",
    value: function (e) {
      return "true" !== e && "false" !== e ? e : "true" === e
    }
  }]);
  var U = E,
    m = (e(_, [{
      key: "setContent",
      value: function () {
        var t = this,
          i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
          e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
        if (D(i, "loaded")) return !1;
        var s, n = this.instance.settings,
          a = this.slideConfig,
          r = b(),
          o = (B(n.beforeSlideLoad) && n.beforeSlideLoad({
            index: this.index,
            slide: i,
            player: !1
          }), a.type),
          l = a.descPosition,
          d = i.querySelector(".gslide-media"),
          c = i.querySelector(".gslide-title"),
          h = i.querySelector(".gslide-desc"),
          p = i.querySelector(".gdesc-inner"),
          u = e,
          f = "gSlideTitle_" + this.index,
          m = "gSlideDesc_" + this.index;
        if (B(n.afterSlideLoad) && (u = function () {
            B(e) && e(), n.afterSlideLoad({
              index: t.index,
              slide: i,
              player: t.instance.getSlidePlayerInstance(t.index)
            })
          }), "" == a.title && "" == a.description ? p && p.parentNode.parentNode.removeChild(p.parentNode) : (c && "" !== a.title ? (c.id = f, c.innerHTML = a.title) : c.parentNode.removeChild(c), h && "" !== a.description ? (h.id = m, r && 0 < n.moreLength ? (a.smallDescription = this.slideShortDesc(a.description, n.moreLength, n.moreText), h.innerHTML = a.smallDescription, this.descriptionEvents(h, a)) : h.innerHTML = a.description) : h.parentNode.removeChild(h), I(d.parentNode, "desc-".concat(l)), I(p.parentNode, "description-".concat(l))), I(d, "gslide-".concat(o)), I(i, "loaded"), "video" !== o) {
          if ("external" !== o) return "inline" === o ? (function (e, t, i, s) {
            var n, a = this,
              e = e.querySelector(".gslide-media"),
              r = !(!w(t, "href") || !t.href) && t.href.split("#").pop().trim(),
              o = !(!w(t, "content") || !t.content) && t.content;
            if (o && (y(o) && (n = g('<div class="ginlined-content">'.concat(o, "</div>"))), q(o)) && ("none" == o.style.display && (o.style.display = "block"), (l = document.createElement("div")).className = "ginlined-content", l.appendChild(o), n = l), r) {
              o = document.getElementById(r);
              if (!o) return !1;
              var l = o.cloneNode(!0);
              l.style.height = t.height, l.style.maxWidth = t.width, I(l, "ginlined-content"), n = l
            }
            if (!n) return console.error("Unable to append inline slide content", t), !1;
            e.style.height = t.height, e.style.width = t.width, e.appendChild(n), this.events["inlineclose" + r] = $("click", {
              onElement: e.querySelectorAll(".gtrigger-close"),
              withCallback: function (e) {
                e.preventDefault(), a.close()
              }
            }), B(s) && s()
          }.apply(this.instance, [i, a, this.index, u]), void(a.draggable && new L({
            dragEl: i.querySelector(".gslide-inline"),
            toleranceX: n.dragToleranceX,
            toleranceY: n.dragToleranceY,
            slide: i,
            instance: this.instance
          }))) : void("image" !== o ? B(u) && u() : (f = i, c = a, m = this.index, s = function () {
            var e = i.querySelector("img");
            a.draggable && new L({
              dragEl: e,
              toleranceX: n.dragToleranceX,
              toleranceY: n.dragToleranceY,
              slide: i,
              instance: t.instance
            }), a.zoomable && e.naturalWidth > e.offsetWidth && (I(e, "zoomable"), new P(e, i, function () {
              t.instance.resize()
            })), B(u) && u()
          }, f = f.querySelector(".gslide-media"), r = new Image, h = "gSlideTitle_" + m, m = "gSlideDesc_" + m, r.addEventListener("load", function () {
            B(s) && s()
          }, !1), r.src = c.href, "" != c.sizes && "" != c.srcset && (r.sizes = c.sizes, r.srcset = c.srcset), r.alt = "", X(c.alt) || "" === c.alt || (r.alt = c.alt), "" !== c.title && r.setAttribute("aria-labelledby", h), "" !== c.description && r.setAttribute("aria-describedby", m), c.hasOwnProperty("_hasCustomWidth") && c._hasCustomWidth && (r.style.width = c.width), c.hasOwnProperty("_hasCustomHeight") && c._hasCustomHeight && (r.style.height = c.height), f.insertBefore(r, f.firstChild)));
          ! function (e, t, i, s) {
            var n, a, r, e = e.querySelector(".gslide-media"),
              o = (s = {
                url: t.href,
                callback: s
              }, o = s.url, n = s.allow, a = s.callback, s = s.appendTo, (r = document.createElement("iframe")).className = "vimeo-video gvideo", r.src = o, r.style.width = "100%", r.style.height = "100%", n && r.setAttribute("allow", n), r.onload = function () {
                r.onload = null, I(r, "node-ready"), B(a) && a()
              }, s && s.appendChild(r), r);
            e.parentNode.style.maxWidth = t.width, e.parentNode.style.height = t.height, e.appendChild(o)
          }.apply(this, [i, a, this.index, u])
        } else ! function (t, i, s, n) {
          var a = this,
            e = t.querySelector(".ginner-container"),
            r = "gvideo" + s,
            o = t.querySelector(".gslide-media"),
            l = this.getAllPlayers(),
            d = (I(e, "gvideo-container"), o.insertBefore(g('<div class="gvideo-wrapper"></div>'), o.firstChild), t.querySelector(".gvideo-wrapper")),
            c = (S(this.settings.plyr.css, "Plyr"), i.href),
            h = null == i ? void 0 : i.videoProvider,
            p = !1;
          o.style.maxWidth = i.width, S(this.settings.plyr.js, "Plyr", function () {
            "local" !== (h = !(h = !h && c.match(/vimeo\.com\/([0-9]*)/) ? "vimeo" : h) && (c.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || c.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || c.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) ? "youtube" : h) && h || (h = "local", e = (e = (e = '<video id="' + r + '" ') + 'style="background:#000; max-width: '.concat(i.width, ';" ') + 'preload="metadata" x-webkit-airplay="allow" playsinline controls class="gvideo-local">') + '<source src="'.concat(c, '">'), p = g(e += "</video>"));
            var e = p || g('<div id="'.concat(r, '" data-plyr-provider="').concat(h, '" data-plyr-embed-id="').concat(c, '"></div>')),
              e = (I(d, "".concat(h, "-video gvideo")), d.appendChild(e), d.setAttribute("data-id", r), d.setAttribute("data-index", s), w(a.settings.plyr, "config") ? a.settings.plyr.config : {}),
              e = new Plyr("#" + r, e);
            e.on("ready", function (e) {
              l[r] = e.detail.plyr, B(n) && n()
            }), v(function () {
              return t.querySelector("iframe") && "true" == t.querySelector("iframe").dataset.ready
            }, function () {
              a.resize(t)
            }), e.on("enterfullscreen", G), e.on("exitfullscreen", G)
          })
        }.apply(this.instance, [i, a, this.index, u])
      }
    }, {
      key: "slideShortDesc",
      value: function (e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 50,
          i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
          s = document.createElement("div");
        s.innerHTML = e;
        var n = i;
        return !((e = s.innerText.trim()).length <= t) && (e = e.substr(0, t - 1), n) ? (s = null, e + '... <a href="#" class="desc-more">' + i + "</a>") : e
      }
    }, {
      key: "descriptionEvents",
      value: function (e, a) {
        var r = this,
          e = e.querySelector(".desc-more");
        if (!e) return !1;
        $("click", {
          onElement: e,
          withCallback: function (e, t) {
            e.preventDefault();
            var i = document.body,
              s = N(t, ".gslide-desc");
            if (!s) return !1;
            s.innerHTML = a.description, I(i, "gdesc-open");
            var n = $("click", {
              onElement: [i, N(s, ".gslide-description")],
              withCallback: function (e, t) {
                "a" !== e.target.nodeName.toLowerCase() && (z(i, "gdesc-open"), I(i, "gdesc-closed"), s.innerHTML = a.smallDescription, r.descriptionEvents(s, a), setTimeout(function () {
                  z(i, "gdesc-closed")
                }, 400), n.destroy())
              }
            })
          }
        })
      }
    }, {
      key: "create",
      value: function () {
        return g(this.instance.settings.slideHTML)
      }
    }, {
      key: "getConfig",
      value: function () {
        q(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
        var e = new U(this.instance.settings.slideExtraAttributes);
        return this.slideConfig = e.parseConfig(this.element, this.instance.settings), this.slideConfig
      }
    }]), _),
    K = b(),
    Q = null !== b() || void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints,
    Z = document.getElementsByTagName("html")[0],
    J = {
      selector: ".glightbox",
      elements: null,
      skin: "clean",
      theme: "clean",
      closeButton: !0,
      startAt: null,
      autoplayVideos: !0,
      autofocusVideos: !0,
      descPosition: "bottom",
      width: "900px",
      height: "506px",
      videosWidth: "960px",
      beforeSlideChange: null,
      afterSlideChange: null,
      beforeSlideLoad: null,
      afterSlideLoad: null,
      slideInserted: null,
      slideRemoved: null,
      slideExtraAttributes: null,
      onOpen: null,
      onClose: null,
      loop: !1,
      zoomable: !0,
      draggable: !0,
      dragAutoSnap: !1,
      dragToleranceX: 40,
      dragToleranceY: 65,
      preload: !0,
      oneSlidePerOpen: !1,
      touchNavigation: !0,
      touchFollowAxis: !0,
      keyboardNavigation: !0,
      closeOnOutsideClick: !0,
      plugins: !1,
      plyr: {
        css: "https://cdn.plyr.io/3.6.12/plyr.css",
        js: "https://cdn.plyr.io/3.6.12/plyr.js",
        config: {
          ratio: "16:9",
          fullscreen: {
            enabled: !0,
            iosNative: !0
          },
          youtube: {
            noCookie: !0,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3
          },
          vimeo: {
            byline: !1,
            portrait: !1,
            title: !1,
            transparent: !1
          }
        }
      },
      openEffect: "zoom",
      closeEffect: "zoom",
      slideEffect: "slide",
      moreText: "See more",
      moreLength: 60,
      cssEfects: {
        fade: {
          in: "fadeIn",
          out: "fadeOut"
        },
        zoom: {
          in: "zoomIn",
          out: "zoomOut"
        },
        slide: {
          in: "slideInRight",
          out: "slideOutLeft"
        },
        slideBack: {
          in: "slideInLeft",
          out: "slideOutRight"
        },
        none: {
          in: "none",
          out: "none"
        }
      },
      svg: {
        close: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
        next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
        prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
      },
      slideHTML: '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
      lightboxHTML: '<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>'
    },
    ee = (e(x, [{
      key: "init",
      value: function () {
        var i = this,
          e = this.getSelector();
        e && (this.baseEvents = $("click", {
          onElement: e,
          withCallback: function (e, t) {
            e.preventDefault(), i.open(t)
          }
        })), this.elements = this.getElements()
      }
    }, {
      key: "open",
      value: function () {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null,
          t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        if (0 === this.elements.length) return !1;
        this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
        var i, a, s, n, r, o, l, d, c, h, p, u, f, m, g, v, b, y, w, x, _, E, T, C, S, M, k, A, O, P, t = Y(t) ? t : this.settings.startAt,
          L = (Y(t = q(e) && ((L = e.getAttribute("data-gallery")) && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, L)), X(t)) && (t = this.getElementIndex(e)) < 0 ? 0 : t) || (t = 0), this.build(), j(this.overlay, "none" === this.settings.openEffect ? "none" : this.settings.cssEfects.fade.in), document.body),
          e = window.innerWidth - document.documentElement.clientWidth;
        0 < e && ((i = document.createElement("style")).type = "text/css", i.className = "gcss-styles", i.innerText = ".gscrollbar-fixer {margin-right: ".concat(e, "px}"), document.head.appendChild(i), I(L, "gscrollbar-fixer")), I(L, "glightbox-open"), I(Z, "glightbox-open"), K && (I(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(t, !0), (1 === this.elements.length ? (I(this.prevButton, "glightbox-button-hidden"), I) : (z(this.prevButton, "glightbox-button-hidden"), z))(this.nextButton, "glightbox-button-hidden"), this.lightboxOpen = !0, this.trigger("open"), B(this.settings.onOpen) && this.settings.onOpen(), Q && this.settings.touchNavigation && ((s = this).events.hasOwnProperty("touch") || (e = F(), l = e.width, d = e.height, f = c = !1, _ = x = w = y = u = p = h = null, S = C = b = v = !(g = m = 1), M = {}, k = {}, O = A = T = E = 0, e = document.getElementById("glightbox-slider"), P = document.querySelector(".goverlay"), e = new V(e, {
          touchStart: function (e) {
            c = !0, (D(e.targetTouches[0].target, "ginner-container") || N(e.targetTouches[0].target, ".gslide-desc") || "a" == e.targetTouches[0].target.nodeName.toLowerCase()) && (c = !1), (c = !(N(e.targetTouches[0].target, ".gslide-inline") && !D(e.targetTouches[0].target.parentNode, "gslide-inline")) && c) && (k = e.targetTouches[0], M.pageX = e.targetTouches[0].pageX, M.pageY = e.targetTouches[0].pageY, A = e.targetTouches[0].clientX, O = e.targetTouches[0].clientY, h = s.activeSlide, p = h.querySelector(".gslide-media"), o = h.querySelector(".gslide-inline"), u = null, D(p, "gslide-image") && (u = p.querySelector("img")), 769 < (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) && (p = h.querySelector(".ginner-container")), z(P, "greset"), 20 < e.pageX && e.pageX < window.innerWidth - 20 || e.preventDefault())
          },
          touchMove: function (e) {
            if (c && (k = e.targetTouches[0], !v) && !b) {
              if (o && o.offsetHeight > d) {
                var t = M.pageX - k.pageX;
                if (Math.abs(t) <= 13) return !1
              }
              f = !0;
              var i, t = e.targetTouches[0].clientX,
                e = e.targetTouches[0].clientY,
                t = A - t,
                e = O - e;
              if (Math.abs(t) > Math.abs(e) ? S = !(C = !1) : C = !(S = !1), n = k.pageX - M.pageX, E = 100 * n / l, r = k.pageY - M.pageY, T = 100 * r / d, C && u && (i = 1 - Math.abs(r) / d, P.style.opacity = i, s.settings.touchFollowAxis) && (E = 0), S && (i = 1 - Math.abs(n) / l, p.style.opacity = i, s.settings.touchFollowAxis) && (T = 0), !u) return H(p, "translate3d(".concat(E, "%, 0, 0)"));
              H(p, "translate3d(".concat(E, "%, ").concat(T, "%, 0)"))
            }
          },
          touchEnd: function () {
            if (c) {
              var e, t;
              if (f = !1, !b && !v) return e = Math.abs(parseInt(T)), t = Math.abs(parseInt(E)), 29 < e && u ? void s.close() : e < 29 && t < 25 ? (I(P, "greset"), P.style.opacity = 1, W(p)) : void 0;
              x = y, _ = w
            }
          },
          multipointEnd: function () {
            setTimeout(function () {
              v = !1
            }, 50)
          },
          multipointStart: function () {
            v = !0, m = g || 1
          },
          pinch: function (e) {
            if (!u || f) return !1;
            v = !0, u.scaleX = u.scaleY = m * e.zoom;
            e = m * e.zoom;
            b = !0, e <= 1 ? (b = !1, e = 1, w = y = x = _ = null, u.setAttribute("style", "")) : (u.style.transform = "scale3d(".concat(e = 4.5 < e ? 4.5 : e, ", ").concat(e, ", 1)"), g = e)
          },
          pressMove: function (e) {
            var t, i;
            b && !v && (i = k.pageX - M.pageX, t = k.pageY - M.pageY, x && (i += x), _ && (t += _), y = i, w = t, i = "translate3d(".concat(i, "px, ").concat(t, "px, 0)"), g && (i += " scale3d(".concat(g, ", ").concat(g, ", 1)")), H(u, i))
          },
          swipe: function (e) {
            if (!b)
              if (v) v = !1;
              else {
                if ("Left" == e.direction) {
                  if (s.index == s.elements.length - 1) return W(p);
                  s.nextSlide()
                }
                if ("Right" == e.direction) {
                  if (0 == s.index) return W(p);
                  s.prevSlide()
                }
              }
          }
        }), s.events.touch = e)), !this.settings.keyboardNavigation || (a = this).events.hasOwnProperty("keyboard") || (a.events.keyboard = $("keydown", {
          onElement: window,
          withCallback: function (e, t) {
            var i = (e = e || window.event).keyCode;
            if (9 == i) {
              var s = document.querySelector(".gbtn.focused");
              if (!s) {
                var n = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
                if ("input" == n || "textarea" == n || "button" == n) return
              }
              e.preventDefault();
              n = document.querySelectorAll(".gbtn[data-taborder]");
              if (!n || n.length <= 0) return;
              if (!s) return void((e = R()) && (e.focus(), I(e, "focused")));
              n = R(s.getAttribute("data-taborder"));
              z(s, "focused"), n && (n.focus(), I(n, "focused"))
            }
            39 == i && a.nextSlide(), 37 == i && a.prevSlide(), 27 == i && a.close()
          }
        }))
      }
    }, {
      key: "openAt",
      value: function () {
        this.open(null, 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0)
      }
    }, {
      key: "showSlide",
      value: function () {
        var e, t = this,
          i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
          s = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
          n = (C(this.loader), this.index = parseInt(i), this.slidesContainer.querySelector(".current")),
          a = (n && z(n, "current"), this.slideAnimateOut(), this.slidesContainer.querySelectorAll(".gslide")[i]);
        D(a, "loaded") ? (this.slideAnimateIn(a, s), l(this.loader)) : (C(this.loader), n = this.elements[i], e = {
          index: this.index,
          slide: a,
          slideNode: a,
          slideConfig: n.slideConfig,
          slideIndex: this.index,
          trigger: n.node,
          player: null
        }, this.trigger("slide_before_load", e), n.instance.setContent(a, function () {
          l(t.loader), t.resize(), t.slideAnimateIn(a, s), t.trigger("slide_after_load", e)
        })), this.slideDescription = a.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && D(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(i + 1), this.preloadSlide(i - 1)), this.updateNavigationClasses(), this.activeSlide = a
      }
    }, {
      key: "preloadSlide",
      value: function (e) {
        var t, i, s, n, a = this;
        return !(e < 0 || e > this.elements.length - 1 || X(this.elements[e]) || D(t = this.slidesContainer.querySelectorAll(".gslide")[e], "loaded")) && (s = (i = this.elements[e]).type, n = {
          index: e,
          slide: t,
          slideNode: t,
          slideConfig: i.slideConfig,
          slideIndex: e,
          trigger: i.node,
          player: null
        }, this.trigger("slide_before_load", n), void("video" === s || "external" === s ? setTimeout(function () {
          i.instance.setContent(t, function () {
            a.trigger("slide_after_load", n)
          })
        }, 200) : i.instance.setContent(t, function () {
          a.trigger("slide_after_load", n)
        })))
      }
    }, {
      key: "prevSlide",
      value: function () {
        this.goToSlide(this.index - 1)
      }
    }, {
      key: "nextSlide",
      value: function () {
        this.goToSlide(this.index + 1)
      }
    }, {
      key: "goToSlide",
      value: function () {
        var e = 0 < arguments.length && void 0 !== arguments[0] && arguments[0];
        if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (e < 0 || e > this.elements.length - 1)) return !1;
        e < 0 ? e = this.elements.length - 1 : e >= this.elements.length && (e = 0), this.showSlide(e)
      }
    }, {
      key: "insertSlide",
      value: function () {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : -1,
          e = (t < 0 && (t = this.elements.length), new m(e, this, t)),
          i = e.getConfig(),
          s = d({}, i),
          n = e.create(),
          a = this.elements.length - 1,
          e = (s.index = t, s.node = !1, s.instance = e, s.slideConfig = i, this.elements.splice(t, 0, s), null),
          r = null;
        this.slidesContainer && (a < t ? this.slidesContainer.appendChild(n) : (a = this.slidesContainer.querySelectorAll(".gslide")[t], this.slidesContainer.insertBefore(n, a)), (this.settings.preload && 0 == this.index && 0 == t || this.index - 1 == t || this.index + 1 == t) && this.preloadSlide(t), 0 === this.index && 0 === t && (this.index = 1), this.updateNavigationClasses(), e = this.slidesContainer.querySelectorAll(".gslide")[t], r = this.getSlidePlayerInstance(t), s.slideNode = e), this.trigger("slide_inserted", {
          index: t,
          slide: e,
          slideNode: e,
          slideConfig: i,
          slideIndex: t,
          trigger: null,
          player: r
        }), B(this.settings.slideInserted) && this.settings.slideInserted({
          index: t,
          slide: e,
          player: r
        })
      }
    }, {
      key: "removeSlide",
      value: function () {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : -1;
        if (e < 0 || e > this.elements.length - 1) return !1;
        var t = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[e];
        t && (this.getActiveSlideIndex() == e && (e == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), t.parentNode.removeChild(t)), this.elements.splice(e, 1), this.trigger("slide_removed", e), B(this.settings.slideRemoved) && this.settings.slideRemoved(e)
      }
    }, {
      key: "slideAnimateIn",
      value: function (e, t) {
        var i = this,
          s = e.querySelector(".gslide-media"),
          n = e.querySelector(".gslide-description"),
          a = {
            index: this.prevActiveSlideIndex,
            slide: this.prevActiveSlide,
            slideNode: this.prevActiveSlide,
            slideIndex: this.prevActiveSlide,
            slideConfig: X(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
            trigger: X(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
            player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
          },
          r = {
            index: this.index,
            slide: this.activeSlide,
            slideNode: this.activeSlide,
            slideConfig: this.elements[this.index].slideConfig,
            slideIndex: this.index,
            trigger: this.elements[this.index].node,
            player: this.getSlidePlayerInstance(this.index)
          };
        0 < s.offsetWidth && n && (l(n), n.style.display = ""), z(e, this.effectsClasses), t ? j(e, this.settings.cssEfects[this.settings.openEffect].in, function () {
          i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
            prev: a,
            current: r
          }), B(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [a, r])
        }) : (n = "none" !== (s = this.settings.slideEffect) ? this.settings.cssEfects[s].in : s, this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (n = this.settings.cssEfects.slideBack.in), j(e, n, function () {
          i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
            prev: a,
            current: r
          }), B(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [a, r])
        })), setTimeout(function () {
          i.resize(e)
        }, 100), I(e, "current")
      }
    }, {
      key: "slideAnimateOut",
      value: function () {
        if (!this.prevActiveSlide) return !1;
        var s = this.prevActiveSlide,
          e = (z(s, this.effectsClasses), I(s, "prev"), this.settings.slideEffect),
          e = "none" !== e ? this.settings.cssEfects[e].out : e;
        this.slidePlayerPause(s), this.trigger("slide_before_change", {
          prev: {
            index: this.prevActiveSlideIndex,
            slide: this.prevActiveSlide,
            slideNode: this.prevActiveSlide,
            slideIndex: this.prevActiveSlideIndex,
            slideConfig: X(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
            trigger: X(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
            player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
          },
          current: {
            index: this.index,
            slide: this.activeSlide,
            slideNode: this.activeSlide,
            slideIndex: this.index,
            slideConfig: this.elements[this.index].slideConfig,
            trigger: this.elements[this.index].node,
            player: this.getSlidePlayerInstance(this.index)
          }
        }), B(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{
          index: this.prevActiveSlideIndex,
          slide: this.prevActiveSlide,
          player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
        }, {
          index: this.index,
          slide: this.activeSlide,
          player: this.getSlidePlayerInstance(this.index)
        }]), this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (e = this.settings.cssEfects.slideBack.out), j(s, e, function () {
          var e = s.querySelector(".ginner-container"),
            t = s.querySelector(".gslide-media"),
            i = s.querySelector(".gslide-description");
          e.style.transform = "", t.style.transform = "", z(t, "greset"), t.style.opacity = "", i && (i.style.opacity = ""), z(s, "prev")
        })
      }
    }, {
      key: "getAllPlayers",
      value: function () {
        return this.videoPlayers
      }
    }, {
      key: "getSlidePlayerInstance",
      value: function (e) {
        var e = "gvideo" + e,
          t = this.getAllPlayers();
        return !(!w(t, e) || !t[e]) && t[e]
      }
    }, {
      key: "stopSlideVideo",
      value: function (e) {
        q(e) && (t = e.querySelector(".gvideo-wrapper")) && (e = t.getAttribute("data-index")), console.log("stopSlideVideo is deprecated, use slidePlayerPause");
        var t = this.getSlidePlayerInstance(e);
        t && t.playing && t.pause()
      }
    }, {
      key: "slidePlayerPause",
      value: function (e) {
        q(e) && (t = e.querySelector(".gvideo-wrapper")) && (e = t.getAttribute("data-index"));
        var t = this.getSlidePlayerInstance(e);
        t && t.playing && t.pause()
      }
    }, {
      key: "playSlideVideo",
      value: function (e) {
        q(e) && (t = e.querySelector(".gvideo-wrapper")) && (e = t.getAttribute("data-index")), console.log("playSlideVideo is deprecated, use slidePlayerPlay");
        var t = this.getSlidePlayerInstance(e);
        t && !t.playing && t.play()
      }
    }, {
      key: "slidePlayerPlay",
      value: function (e) {
        var t;
        (!K || null != (t = this.settings.plyr.config) && t.muted) && (q(e) && (t = e.querySelector(".gvideo-wrapper")) && (e = t.getAttribute("data-index")), t = this.getSlidePlayerInstance(e)) && !t.playing && (t.play(), this.settings.autofocusVideos) && t.elements.container.focus()
      }
    }, {
      key: "setElements",
      value: function (e) {
        var n = this,
          a = (this.settings.elements = !1, []);
        e && e.length && p(e, function (e, t) {
          var e = new m(e, n, t),
            i = e.getConfig(),
            s = d({}, i);
          s.slideConfig = i, s.instance = e, s.index = t, a.push(s)
        }), this.elements = a, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length) && (p(this.elements, function () {
          var e = g(n.settings.slideHTML);
          n.slidesContainer.appendChild(e)
        }), this.showSlide(0, !0))
      }
    }, {
      key: "getElementIndex",
      value: function (i) {
        var s = !1;
        return p(this.elements, function (e, t) {
          if (w(e, "node") && e.node == i) return s = t, !0
        }), s
      }
    }, {
      key: "getElements",
      value: function () {
        var a = this,
          r = [],
          e = (this.elements = this.elements || [], !X(this.settings.elements) && M(this.settings.elements) && this.settings.elements.length && p(this.settings.elements, function (e, t) {
            var e = new m(e, a, t),
              i = e.getConfig(),
              s = d({}, i);
            s.node = !1, s.index = t, s.instance = e, s.slideConfig = i, r.push(s)
          }), !1);
        return (e = this.getSelector() ? document.querySelectorAll(this.getSelector()) : e) && p(e, function (e, t) {
          var i = new m(e, a, t),
            s = i.getConfig(),
            n = d({}, s);
          n.node = e, n.index = t, n.instance = i, n.slideConfig = s, n.gallery = e.getAttribute("data-gallery"), r.push(n)
        }), r
      }
    }, {
      key: "getGalleryElements",
      value: function (e, t) {
        return e.filter(function (e) {
          return e.gallery == t
        })
      }
    }, {
      key: "getSelector",
      value: function () {
        return !this.settings.elements && (this.settings.selector && "data-" == this.settings.selector.substring(0, 5) ? "*[".concat(this.settings.selector, "]") : this.settings.selector)
      }
    }, {
      key: "getActiveSlide",
      value: function () {
        return this.slidesContainer.querySelectorAll(".gslide")[this.index]
      }
    }, {
      key: "getActiveSlideIndex",
      value: function () {
        return this.index
      }
    }, {
      key: "getAnimationClasses",
      value: function () {
        var e, t, i = [];
        for (e in this.settings.cssEfects) this.settings.cssEfects.hasOwnProperty(e) && (t = this.settings.cssEfects[e], i.push("g".concat(t.in)), i.push("g".concat(t.out)));
        return i.join(" ")
      }
    }, {
      key: "build",
      value: function () {
        var i = this;
        if (this.built) return !1;
        var e = document.body.childNodes,
          t = [],
          e = (p(e, function (e) {
            e.parentNode == document.body && "#" !== e.nodeName.charAt(0) && e.hasAttribute && !e.hasAttribute("aria-hidden") && (t.push(e), e.setAttribute("aria-hidden", "true"))
          }), w(this.settings.svg, "next") ? this.settings.svg.next : ""),
          s = w(this.settings.svg, "prev") ? this.settings.svg.prev : "",
          n = w(this.settings.svg, "close") ? this.settings.svg.close : "",
          a = g(a = (a = (a = (a = this.settings.lightboxHTML).replace(/{nextSVG}/g, e)).replace(/{prevSVG}/g, s)).replace(/{closeSVG}/g, n)),
          e = (document.body.appendChild(a), document.getElementById("glightbox-body")),
          s = (this.modal = e).querySelector(".gclose");
        this.prevButton = e.querySelector(".gprev"), this.nextButton = e.querySelector(".gnext"), this.overlay = e.querySelector(".goverlay"), this.loader = e.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = t, this.events = {}, I(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && s && (this.events.close = $("click", {
          onElement: s,
          withCallback: function (e, t) {
            e.preventDefault(), i.close()
          }
        })), s && !this.settings.closeButton && s.parentNode.removeChild(s), this.nextButton && (this.events.next = $("click", {
          onElement: this.nextButton,
          withCallback: function (e, t) {
            e.preventDefault(), i.nextSlide()
          }
        })), this.prevButton && (this.events.prev = $("click", {
          onElement: this.prevButton,
          withCallback: function (e, t) {
            e.preventDefault(), i.prevSlide()
          }
        })), this.settings.closeOnOutsideClick && (this.events.outClose = $("click", {
          onElement: e,
          withCallback: function (e, t) {
            i.preventOutsideClick || D(document.body, "glightbox-mobile") || N(e.target, ".ginner-container") || N(e.target, ".gbtn") || D(e.target, "gnext") || D(e.target, "gprev") || i.close()
          }
        })), p(this.elements, function (e, t) {
          i.slidesContainer.appendChild(e.instance.create()), e.slideNode = i.slidesContainer.querySelectorAll(".gslide")[t]
        }), Q && I(document.body, "glightbox-touch"), this.events.resize = $("resize", {
          onElement: window,
          withCallback: function () {
            i.resize()
          }
        }), this.built = !0
      }
    }, {
      key: "resize",
      value: function () {
        var e, t, i, s, n, a, r, o = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : null;
        (o = o || this.activeSlide) && !D(o, "zoomed") && (i = F(), e = o.querySelector(".gvideo-wrapper"), o = o.querySelector(".gslide-image"), t = this.slideDescription, a = i.width, i = i.height, (a <= 768 ? I : z)(document.body, "glightbox-mobile"), e || o) && (s = !1, t && (D(t, "description-bottom") || D(t, "description-top")) && !D(t, "gabsolute") && (s = !0), o && (a <= 768 ? o.querySelector("img") : s && (n = t.offsetHeight, (o = o.querySelector("img")).setAttribute("style", "max-height: calc(100vh - ".concat(n, "px)")), t.setAttribute("style", "max-width: ".concat(o.offsetWidth, "px;")))), e) && ((n = w(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "") || (o = e.clientWidth, r = e.clientHeight, n = "".concat(o / (o = o / r), ":").concat(r / o)), r = n.split(":"), o = this.settings.videosWidth, n = this.settings.videosWidth, r = (n = Y(o) || -1 !== o.indexOf("px") ? parseInt(o) : -1 !== o.indexOf("vw") ? a * parseInt(o) / 100 : -1 !== o.indexOf("vh") ? i * parseInt(o) / 100 : -1 !== o.indexOf("%") ? a * parseInt(o) / 100 : parseInt(e.clientWidth)) / (parseInt(r[0]) / parseInt(r[1])), r = Math.floor(r), s && (i -= t.offsetHeight), a < n || i < r || i < r && n < a ? (r = e.offsetWidth, n = e.offsetHeight, e.parentNode.setAttribute("style", "max-width: ".concat((r = {
          width: r * (a = i / n),
          height: n * a
        }).width, "px")), s && t.setAttribute("style", "max-width: ".concat(r.width, "px;"))) : (e.parentNode.style.maxWidth = "".concat(o), s && t.setAttribute("style", "max-width: ".concat(o, ";"))))
      }
    }, {
      key: "reload",
      value: function () {
        this.init()
      }
    }, {
      key: "updateNavigationClasses",
      value: function () {
        var e = this.loop();
        z(this.nextButton, "disabled"), z(this.prevButton, "disabled"), 0 == this.index && this.elements.length - 1 == 0 ? (I(this.prevButton, "disabled"), I(this.nextButton, "disabled")) : 0 !== this.index || e ? this.index !== this.elements.length - 1 || e || I(this.nextButton, "disabled") : I(this.prevButton, "disabled")
      }
    }, {
      key: "loop",
      value: function () {
        var e = w(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
        return w(this.settings, "loop") ? this.settings.loop : e
      }
    }, {
      key: "close",
      value: function () {
        var i = this;
        if (!this.lightboxOpen) {
          if (this.events) {
            for (var e in this.events) this.events.hasOwnProperty(e) && this.events[e].destroy();
            this.events = null
          }
          return !1
        }
        if (this.closing) return !1;
        this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && p(this.bodyHiddenChildElms, function (e) {
          e.removeAttribute("aria-hidden")
        }), I(this.modal, "glightbox-closing"), j(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.out), j(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function () {
          if (i.activeSlide = null, i.prevActiveSlideIndex = null, i.prevActiveSlide = null, i.built = !1, i.events) {
            for (var e in i.events) i.events.hasOwnProperty(e) && i.events[e].destroy();
            i.events = null
          }
          var t = document.body,
            t = (z(Z, "glightbox-open"), z(t, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), i.modal.parentNode.removeChild(i.modal), i.trigger("close"), B(i.settings.onClose) && i.settings.onClose(), document.querySelector(".gcss-styles"));
          t && t.parentNode.removeChild(t), i.lightboxOpen = !1, i.closing = null
        })
      }
    }, {
      key: "destroy",
      value: function () {
        this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy()
      }
    }, {
      key: "on",
      value: function (e, t) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
        if (!e || !B(t)) throw new TypeError("Event name and callback must be defined");
        this.apiEvents.push({
          evt: e,
          once: i,
          callback: t
        })
      }
    }, {
      key: "once",
      value: function (e, t) {
        this.on(e, t, !0)
      }
    }, {
      key: "trigger",
      value: function (n) {
        var t = this,
          a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null,
          r = [];
        p(this.apiEvents, function (e, t) {
          var i = e.evt,
            s = e.once,
            e = e.callback;
          i == n && (e(a), s) && r.push(t)
        }), r.length && p(r, function (e) {
          return t.apiEvents.splice(e, 1)
        })
      }
    }, {
      key: "clearAllEvents",
      value: function () {
        this.apiEvents.splice(0, this.apiEvents.length)
      }
    }, {
      key: "version",
      value: function () {
        return "3.1.0"
      }
    }]), x);

  function x() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
    r(this, x), this.customOptions = e, this.settings = d(J, e), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1
  }

  function _(e, t, i) {
    r(this, _), this.element = e, this.instance = t, this.index = i
  }

  function E() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
    r(this, E), this.defaults = {
      href: "",
      sizes: "",
      srcset: "",
      title: "",
      type: "",
      videoProvider: "",
      description: "",
      alt: "",
      descPosition: "bottom",
      effect: "",
      width: "",
      height: "",
      content: !1,
      zoomable: !0,
      draggable: !0
    }, c(e) && (this.defaults = d(this.defaults, e))
  }
  return function () {
    var e = new ee(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {});
    return e.init(), e
  }
}),
function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, function () {
  "use strict";

  function s(e) {
    return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
  }

  function n(t, i) {
    void 0 === t && (t = {}), void 0 === i && (i = {}), Object.keys(i).forEach(e => {
      void 0 === t[e] ? t[e] = i[e] : s(i[e]) && s(t[e]) && 0 < Object.keys(i[e]).length && n(t[e], i[e])
    })
  }
  const t = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
      blur() {},
      nodeName: ""
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({
      initEvent() {}
    }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => []
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };

  function T() {
    var e = "undefined" != typeof document ? document : {};
    return n(e, t), e
  }
  const D = {
    document: t,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState() {},
      pushState() {},
      go() {},
      back() {}
    },
    CustomEvent: function () {
      return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({
      getPropertyValue: () => ""
    }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e)
    }
  };

  function P() {
    var e = "undefined" != typeof window ? window : {};
    return n(e, D), e
  }
  class r extends Array {
    constructor(e) {
      if ("number" == typeof e) super(e);
      else {
        super(...e || []); {
          e = this;
          const t = e.__proto__;
          Object.defineProperty(e, "__proto__", {
            get: () => t,
            set(e) {
              t.__proto__ = e
            }
          })
        }
      }
    }
  }

  function a(e) {
    const t = [];
    return (e = void 0 === e ? [] : e).forEach(e => {
      Array.isArray(e) ? t.push(...a(e)) : t.push(e)
    }), t
  }

  function o(e, t) {
    return Array.prototype.filter.call(e, t)
  }

  function L(e, s) {
    const t = P(),
      n = T();
    let i = [];
    if (!s && e instanceof r) return e;
    if (!e) return new r(i);
    if ("string" == typeof e) {
      const t = e.trim();
      if (0 <= t.indexOf("<") && 0 <= t.indexOf(">")) {
        let e = "div";
        0 === t.indexOf("<li") && (e = "ul"), 0 === t.indexOf("<tr") && (e = "tbody"), 0 !== t.indexOf("<td") && 0 !== t.indexOf("<th") || (e = "tr"), 0 === t.indexOf("<tbody") && (e = "table"), 0 === t.indexOf("<option") && (e = "select");
        const s = n.createElement(e);
        s.innerHTML = t;
        for (let e = 0; e < s.childNodes.length; e += 1) i.push(s.childNodes[e])
      } else i = function (e) {
        if ("string" != typeof e) return [e];
        var t = [],
          i = (s || n).querySelectorAll(e);
        for (let e = 0; e < i.length; e += 1) t.push(i[e]);
        return t
      }(e.trim())
    } else if (e.nodeType || e === t || e === n) i.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof r) return e;
      i = e
    }
    return new r(function (t) {
      var i = [];
      for (let e = 0; e < t.length; e += 1) - 1 === i.indexOf(t[e]) && i.push(t[e]);
      return i
    }(i))
  }
  L.fn = r.prototype;
  const i = {
    addClass: function () {
      for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
      const s = a(t.map(e => e.split(" ")));
      return this.forEach(e => {
        e.classList.add(...s)
      }), this
    },
    removeClass: function () {
      for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
      const s = a(t.map(e => e.split(" ")));
      return this.forEach(e => {
        e.classList.remove(...s)
      }), this
    },
    hasClass: function () {
      for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
      const s = a(t.map(e => e.split(" ")));
      return 0 < o(this, t => 0 < s.filter(e => t.classList.contains(e)).length).length
    },
    toggleClass: function () {
      for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
      const s = a(t.map(e => e.split(" ")));
      this.forEach(t => {
        s.forEach(e => {
          t.classList.toggle(e)
        })
      })
    },
    attr: function (t, i) {
      if (1 === arguments.length && "string" == typeof t) return this[0] ? this[0].getAttribute(t) : void 0;
      for (let e = 0; e < this.length; e += 1)
        if (2 === arguments.length) this[e].setAttribute(t, i);
        else
          for (const i in t) this[e][i] = t[i], this[e].setAttribute(i, t[i]);
      return this
    },
    removeAttr: function (t) {
      for (let e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
      return this
    },
    transform: function (t) {
      for (let e = 0; e < this.length; e += 1) this[e].style.transform = t;
      return this
    },
    transition: function (t) {
      for (let e = 0; e < this.length; e += 1) this[e].style.transitionDuration = "string" != typeof t ? t + "ms" : t;
      return this
    },
    on: function () {
      for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++) i[e] = arguments[e];
      let [s, n, a, r] = i;

      function o(t) {
        var e = t.target;
        if (e) {
          var i = t.target.dom7EventData || [];
          if (i.indexOf(t) < 0 && i.unshift(t), L(e).is(n)) a.apply(e, i);
          else {
            const t = L(e).parents();
            for (let e = 0; e < t.length; e += 1) L(t[e]).is(n) && a.apply(t[e], i)
          }
        }
      }

      function l(e) {
        var t = e && e.target && e.target.dom7EventData || [];
        t.indexOf(e) < 0 && t.unshift(e), a.apply(this, t)
      }
      "function" == typeof i[1] && ([s, a, r] = i, n = void 0), r = r || !1;
      var d = s.split(" ");
      let c;
      for (let e = 0; e < this.length; e += 1) {
        const i = this[e];
        if (n)
          for (c = 0; c < d.length; c += 1) {
            const t = d[c];
            i.dom7LiveListeners || (i.dom7LiveListeners = {}), i.dom7LiveListeners[t] || (i.dom7LiveListeners[t] = []), i.dom7LiveListeners[t].push({
              listener: a,
              proxyListener: o
            }), i.addEventListener(t, o, r)
          } else
            for (c = 0; c < d.length; c += 1) {
              const t = d[c];
              i.dom7Listeners || (i.dom7Listeners = {}), i.dom7Listeners[t] || (i.dom7Listeners[t] = []), i.dom7Listeners[t].push({
                listener: a,
                proxyListener: l
              }), i.addEventListener(t, l, r)
            }
      }
      return this
    },
    off: function () {
      for (var e = arguments.length, i = new Array(e), s = 0; s < e; s++) i[s] = arguments[s];
      let [t, n, a, r] = i;
      "function" == typeof i[1] && ([t, a, r] = i, n = void 0), r = r || !1;
      var o = t.split(" ");
      for (let e = 0; e < o.length; e += 1) {
        const i = o[e];
        for (let e = 0; e < this.length; e += 1) {
          const s = this[e];
          let t;
          if (!n && s.dom7Listeners ? t = s.dom7Listeners[i] : n && s.dom7LiveListeners && (t = s.dom7LiveListeners[i]), t && t.length)
            for (let e = t.length - 1; 0 <= e; --e) {
              const n = t[e];
              (a && n.listener === a || a && n.listener && n.listener.dom7proxy && n.listener.dom7proxy === a || !a) && (s.removeEventListener(i, n.proxyListener, r), t.splice(e, 1))
            }
        }
      }
      return this
    },
    trigger: function () {
      for (var t = P(), i = arguments.length, s = new Array(i), n = 0; n < i; n++) s[n] = arguments[n];
      const a = s[0].split(" "),
        r = s[1];
      for (let e = 0; e < a.length; e += 1) {
        const n = a[e];
        for (let e = 0; e < this.length; e += 1) {
          const a = this[e];
          if (t.CustomEvent) {
            const i = new t.CustomEvent(n, {
              detail: r,
              bubbles: !0,
              cancelable: !0
            });
            a.dom7EventData = s.filter((e, t) => 0 < t), a.dispatchEvent(i), a.dom7EventData = [], delete a.dom7EventData
          }
        }
      }
      return this
    },
    transitionEnd: function (i) {
      const s = this;
      return i && s.on("transitionend", function e(t) {
        t.target === this && (i.call(this, t), s.off("transitionend", e))
      }), this
    },
    outerWidth: function (e) {
      if (0 < this.length) {
        if (e) {
          const e = this.styles();
          return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
        }
        return this[0].offsetWidth
      }
      return null
    },
    outerHeight: function (e) {
      if (0 < this.length) {
        if (e) {
          const e = this.styles();
          return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
        }
        return this[0].offsetHeight
      }
      return null
    },
    styles: function () {
      var e = P();
      return this[0] ? e.getComputedStyle(this[0], null) : {}
    },
    offset: function () {
      var e, t, i, s, n, a;
      return 0 < this.length ? (a = P(), s = T(), t = (e = this[0]).getBoundingClientRect(), s = s.body, i = e.clientTop || s.clientTop || 0, s = e.clientLeft || s.clientLeft || 0, n = e === a ? a.scrollY : e.scrollTop, a = e === a ? a.scrollX : e.scrollLeft, {
        top: t.top + n - i,
        left: t.left + a - s
      }) : null
    },
    css: function (e, t) {
      var i = P();
      let s;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (s = 0; s < this.length; s += 1)
            for (const t in e) this[s].style[t] = e[t];
          return this
        }
        if (this[0]) return i.getComputedStyle(this[0], null).getPropertyValue(e)
      }
      if (2 === arguments.length && "string" == typeof e)
        for (s = 0; s < this.length; s += 1) this[s].style[e] = t;
      return this
    },
    each: function (i) {
      return i && this.forEach((e, t) => {
        i.apply(e, [e, t])
      }), this
    },
    html: function (t) {
      if (void 0 === t) return this[0] ? this[0].innerHTML : null;
      for (let e = 0; e < this.length; e += 1) this[e].innerHTML = t;
      return this
    },
    text: function (t) {
      if (void 0 === t) return this[0] ? this[0].textContent.trim() : null;
      for (let e = 0; e < this.length; e += 1) this[e].textContent = t;
      return this
    },
    is: function (e) {
      var t = P(),
        i = T(),
        s = this[0];
      let n, a;
      if (s && void 0 !== e)
        if ("string" == typeof e) {
          if (s.matches) return s.matches(e);
          if (s.webkitMatchesSelector) return s.webkitMatchesSelector(e);
          if (s.msMatchesSelector) return s.msMatchesSelector(e);
          for (n = L(e), a = 0; a < n.length; a += 1)
            if (n[a] === s) return !0
        } else {
          if (e === i) return s === i;
          if (e === t) return s === t;
          if (e.nodeType || e instanceof r)
            for (n = e.nodeType ? [e] : e, a = 0; a < n.length; a += 1)
              if (n[a] === s) return !0
        } return !1
    },
    index: function () {
      let e, t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
        return e
      }
    },
    eq: function (e) {
      var t;
      return void 0 === e ? this : L((t = this.length) - 1 < e ? [] : e < 0 ? (t = t + e) < 0 ? [] : [this[t]] : [this[e]])
    },
    append: function () {
      var i, s = T();
      for (let e = 0; e < arguments.length; e += 1) {
        i = e < 0 || arguments.length <= e ? void 0 : arguments[e];
        for (let t = 0; t < this.length; t += 1)
          if ("string" == typeof i) {
            const T = s.createElement("div");
            for (T.innerHTML = i; T.firstChild;) this[t].appendChild(T.firstChild)
          } else if (i instanceof r)
          for (let e = 0; e < i.length; e += 1) this[t].appendChild(i[e]);
        else this[t].appendChild(i)
      }
      return this
    },
    prepend: function (e) {
      var t = T();
      let i, s;
      for (i = 0; i < this.length; i += 1)
        if ("string" == typeof e) {
          const T = t.createElement("div");
          for (T.innerHTML = e, s = T.childNodes.length - 1; 0 <= s; --s) this[i].insertBefore(T.childNodes[s], this[i].childNodes[0])
        } else if (e instanceof r)
        for (s = 0; s < e.length; s += 1) this[i].insertBefore(e[s], this[i].childNodes[0]);
      else this[i].insertBefore(e, this[i].childNodes[0]);
      return this
    },
    next: function (e) {
      return 0 < this.length ? e ? this[0].nextElementSibling && L(this[0].nextElementSibling).is(e) ? L([this[0].nextElementSibling]) : L([]) : this[0].nextElementSibling ? L([this[0].nextElementSibling]) : L([]) : L([])
    },
    nextAll: function (e) {
      var t = [];
      let i = this[0];
      if (!i) return L([]);
      for (; i.nextElementSibling;) {
        var s = i.nextElementSibling;
        e && !L(s).is(e) || t.push(s), i = s
      }
      return L(t)
    },
    prev: function (e) {
      var t;
      return 0 < this.length ? (t = this[0], e ? t.previousElementSibling && L(t.previousElementSibling).is(e) ? L([t.previousElementSibling]) : L([]) : t.previousElementSibling ? L([t.previousElementSibling]) : L([])) : L([])
    },
    prevAll: function (e) {
      var t = [];
      let i = this[0];
      if (!i) return L([]);
      for (; i.previousElementSibling;) {
        var s = i.previousElementSibling;
        e && !L(s).is(e) || t.push(s), i = s
      }
      return L(t)
    },
    parent: function (t) {
      var i = [];
      for (let e = 0; e < this.length; e += 1) null === this[e].parentNode || t && !L(this[e].parentNode).is(t) || i.push(this[e].parentNode);
      return L(i)
    },
    parents: function (i) {
      var s = [];
      for (let t = 0; t < this.length; t += 1) {
        let e = this[t].parentNode;
        for (; e;) i && !L(e).is(i) || s.push(e), e = e.parentNode
      }
      return L(s)
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? L([]) : t = t.is(e) ? t : t.parents(e).eq(0)
    },
    find: function (t) {
      var i = [];
      for (let e = 0; e < this.length; e += 1) {
        var s = this[e].querySelectorAll(t);
        for (let e = 0; e < s.length; e += 1) i.push(s[e])
      }
      return L(i)
    },
    children: function (t) {
      var i = [];
      for (let e = 0; e < this.length; e += 1) {
        var s = this[e].children;
        for (let e = 0; e < s.length; e += 1) t && !L(s[e]).is(t) || i.push(s[e])
      }
      return L(i)
    },
    filter: function (e) {
      return L(o(this, e))
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this
    }
  };

  function C(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t)
  }

  function v() {
    return Date.now()
  }

  function $(e, t) {
    void 0 === t && (t = "x");
    var i = P();
    let s, n, a;
    e = function (e) {
      var t = P();
      let i;
      return i = (i = !(i = t.getComputedStyle ? t.getComputedStyle(e, null) : i) && e.currentStyle ? e.currentStyle : i) || e.style
    }(e);
    return i.WebKitCSSMatrix ? (6 < (n = e.transform || e.webkitTransform).split(",").length && (n = n.split(", ").map(e => e.replace(",", ".")).join(", ")), a = new i.WebKitCSSMatrix("none" === n ? "" : n)) : (a = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = a.toString().split(",")), "x" === t && (n = i.WebKitCSSMatrix ? a.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), (n = "y" === t ? i.WebKitCSSMatrix ? a.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5]) : n) || 0
  }

  function d(e) {
    return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
  }

  function f(e) {
    const i = Object(arguments.length <= 0 ? void 0 : e),
      t = ["__proto__", "constructor", "prototype"];
    for (let e = 1; e < arguments.length; e += 1) {
      var s = e < 0 || arguments.length <= e ? void 0 : arguments[e];
      if (null != s && (o = s, !("undefined" != typeof window && void 0 !== window.HTMLElement ? o instanceof HTMLElement : o && (1 === o.nodeType || 11 === o.nodeType)))) {
        var n = Object.keys(Object(s)).filter(e => t.indexOf(e) < 0);
        for (let e = 0, t = n.length; e < t; e += 1) {
          var a = n[e],
            r = Object.getOwnPropertyDescriptor(s, a);
          void 0 !== r && r.enumerable && (d(i[a]) && d(s[a]) ? s[a].__swiper__ ? i[a] = s[a] : f(i[a], s[a]) : d(i[a]) || !d(s[a]) || (i[a] = {}, s[a].__swiper__) ? i[a] = s[a] : f(i[a], s[a]))
        }
      }
    }
    var o;
    return i
  }

  function S(e, t, i) {
    e.style.setProperty(t, i)
  }

  function b(e) {
    let {
      swiper: i,
      targetPosition: s,
      side: n
    } = e;
    const a = P(),
      r = -i.translate;
    let o, l = null;
    const d = i.params.speed,
      c = (i.wrapperEl.style.scrollSnapType = "none", a.cancelAnimationFrame(i.cssModeFrameID), s > r ? "next" : "prev"),
      h = (e, t) => "next" === c && t <= e || "prev" === c && e <= t,
      p = () => {
        o = (new Date).getTime(), null === l && (l = o);
        var e = Math.max(Math.min((o - l) / d, 1), 0),
          e = .5 - Math.cos(e * Math.PI) / 2;
        let t = r + e * (s - r);
        h(t, s) && (t = s), i.wrapperEl.scrollTo({
          [n]: t
        }), h(t, s) ? (i.wrapperEl.style.overflow = "hidden", i.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
          i.wrapperEl.style.overflow = "", i.wrapperEl.scrollTo({
            [n]: t
          })
        }), a.cancelAnimationFrame(i.cssModeFrameID)) : i.cssModeFrameID = a.requestAnimationFrame(p)
      };
    p()
  }
  let e, c, l;

  function p() {
    return e = e || function () {
      const i = P(),
        e = T();
      return {
        smoothScroll: e.documentElement && "scrollBehavior" in e.documentElement.style,
        touch: !!("ontouchstart" in i || i.DocumentTouch && e instanceof i.DocumentTouch),
        passiveListener: function () {
          let e = !1;
          try {
            var t = Object.defineProperty({}, "passive", {
              get() {
                e = !0
              }
            });
            i.addEventListener("testPassiveListener", null, t)
          } catch (e) {}
          return e
        }(),
        gestures: "ongesturestart" in i
      }
    }()
  }

  function N() {
    return l = l || function () {
      const e = P();
      return {
        isSafari: 0 <= (t = e.navigator.userAgent.toLowerCase()).indexOf("safari") && t.indexOf("chrome") < 0 && t.indexOf("android") < 0,
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
      };
      var t
    }()
  }

  function h(e) {
    var {
      swiper: e,
      runCallbacks: t,
      direction: i,
      step: s
    } = e, {
      activeIndex: n,
      previousIndex: a
    } = e;
    let r = i;
    if (r = r || (a < n ? "next" : n < a ? "prev" : "reset"), e.emit("transition" + s), t && n !== a) {
      if ("reset" === r) return e.emit("slideResetTransition" + s);
      e.emit("slideChangeTransition" + s), "next" === r ? e.emit("slideNextTransition" + s) : e.emit("slidePrevTransition" + s)
    }
  }

  function u() {
    var e, t, i = this,
      {
        params: s,
        el: n
      } = i;
    n && 0 === n.offsetWidth || (s.breakpoints && i.setBreakpoint(), {
      allowSlideNext: n,
      allowSlidePrev: e,
      snapGrid: t
    } = i, i.allowSlideNext = !0, i.allowSlidePrev = !0, i.updateSize(), i.updateSlides(), i.updateSlidesClasses(), ("auto" === s.slidesPerView || 1 < s.slidesPerView) && i.isEnd && !i.isBeginning && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0), i.autoplay && i.autoplay.running && i.autoplay.paused && i.autoplay.run(), i.allowSlidePrev = e, i.allowSlideNext = n, i.params.watchOverflow && t !== i.snapGrid && i.checkOverflow())
  }
  Object.keys(i).forEach(e => {
    Object.defineProperty(L.fn, e, {
      value: i[e],
      writable: !0
    })
  });
  let m = !1;

  function j() {}
  const g = (e, t) => {
      var i = T(),
        {
          params: s,
          touchEvents: n,
          el: a,
          wrapperEl: r,
          device: o,
          support: l
        } = e,
        d = !!s.nested,
        c = "on" === t ? "addEventListener" : "removeEventListener";
      if (l.touch) {
        const t = !("touchstart" !== n.start || !l.passiveListener || !s.passiveListeners) && {
          passive: !0,
          capture: !1
        };
        a[c](n.start, e.onTouchStart, t), a[c](n.move, e.onTouchMove, l.passiveListener ? {
          passive: !1,
          capture: d
        } : d), a[c](n.end, e.onTouchEnd, t), n.cancel && a[c](n.cancel, e.onTouchEnd, t)
      } else a[c](n.start, e.onTouchStart, !1), i[c](n.move, e.onTouchMove, d), i[c](n.end, e.onTouchEnd, !1);
      (s.preventClicks || s.preventClicksPropagation) && a[c]("click", e.onClick, !0), s.cssMode && r[c]("scroll", e.onScroll), s.updateOnWindowResize ? e[t](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", u, !0) : e[t]("observerUpdate", u, !0)
    },
    y = (e, t) => e.grid && t.grid && 1 < t.grid.rows;
  var w = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopedSlidesLimit: !0,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1
  };
  const x = {
      eventsEmitter: {
        on(e, t, i) {
          const s = this;
          if (s.eventsListeners && !s.destroyed && "function" == typeof t) {
            const n = i ? "unshift" : "push";
            e.split(" ").forEach(e => {
              s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][n](t)
            })
          }
          return s
        },
        once(s, n, e) {
          const a = this;
          return !a.eventsListeners || a.destroyed || "function" != typeof n ? a : (r.__emitterProxy = n, a.on(s, r, e));

          function r() {
            a.off(s, r), r.__emitterProxy && delete r.__emitterProxy;
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            n.apply(a, t)
          }
        },
        onAny(e, t) {
          var i = this;
          return i.eventsListeners && !i.destroyed && "function" == typeof e && (t = t ? "unshift" : "push", i.eventsAnyListeners.indexOf(e) < 0) && i.eventsAnyListeners[t](e), i
        },
        offAny(e) {
          var t = this;
          return t.eventsListeners && !t.destroyed && t.eventsAnyListeners && 0 <= (e = t.eventsAnyListeners.indexOf(e)) && t.eventsAnyListeners.splice(e, 1), t
        },
        off(e, s) {
          const n = this;
          return !n.eventsListeners || n.destroyed || n.eventsListeners && e.split(" ").forEach(i => {
            void 0 === s ? n.eventsListeners[i] = [] : n.eventsListeners[i] && n.eventsListeners[i].forEach((e, t) => {
              (e === s || e.__emitterProxy && e.__emitterProxy === s) && n.eventsListeners[i].splice(t, 1)
            })
          }), n
        },
        emit() {
          const n = this;
          if (n.eventsListeners && !n.destroyed && n.eventsListeners) {
            let e, i, s;
            for (var t = arguments.length, a = new Array(t), r = 0; r < t; r++) a[r] = arguments[r];
            s = "string" == typeof a[0] || Array.isArray(a[0]) ? (e = a[0], i = a.slice(1, a.length), n) : (e = a[0].events, i = a[0].data, a[0].context || n), i.unshift(s), (Array.isArray(e) ? e : e.split(" ")).forEach(t => {
              n.eventsAnyListeners && n.eventsAnyListeners.length && n.eventsAnyListeners.forEach(e => {
                e.apply(s, [t, ...i])
              }), n.eventsListeners && n.eventsListeners[t] && n.eventsListeners[t].forEach(e => {
                e.apply(s, i)
              })
            })
          }
          return n
        }
      },
      update: {
        updateSize: function () {
          var e = this;
          let t, i;
          var s = e.$el;
          t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : s[0].clientWidth, i = void 0 !== e.params.height && null !== e.params.height ? e.params.height : s[0].clientHeight, 0 === t && e.isHorizontal() || 0 === i && e.isVertical() || (t = t - parseInt(s.css("padding-left") || 0, 10) - parseInt(s.css("padding-right") || 0, 10), i = i - parseInt(s.css("padding-top") || 0, 10) - parseInt(s.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(i) && (i = 0), Object.assign(e, {
            width: t,
            height: i,
            size: e.isHorizontal() ? t : i
          }))
        },
        updateSlides: function () {
          const i = this;

          function s(e) {
            return i.isHorizontal() ? e : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom"
            } [e]
          }

          function n(e, t) {
            return parseFloat(e.getPropertyValue(s(t)) || 0)
          }
          const a = i.params,
            {
              $wrapperEl: r,
              size: o,
              rtlTranslate: l,
              wrongRTL: d
            } = i,
            c = i.virtual && a.virtual.enabled,
            e = (c ? i.virtual : i).slides.length,
            h = r.children("." + i.params.slideClass),
            p = (c ? i.virtual.slides : h).length;
          let u = [];
          const f = [],
            m = [];
          let g = a.slidesOffsetBefore,
            v = ("function" == typeof g && (g = a.slidesOffsetBefore.call(i)), a.slidesOffsetAfter);
          "function" == typeof v && (v = a.slidesOffsetAfter.call(i));
          var b = i.snapGrid.length,
            y = i.slidesGrid.length;
          let w = a.spaceBetween,
            x = -g,
            _ = 0,
            E = 0;
          if (void 0 !== o) {
            "string" == typeof w && 0 <= w.indexOf("%") && (w = parseFloat(w.replace("%", "")) / 100 * o), i.virtualSize = -w, l ? h.css({
              marginLeft: "",
              marginBottom: "",
              marginTop: ""
            }) : h.css({
              marginRight: "",
              marginBottom: "",
              marginTop: ""
            }), a.centeredSlides && a.cssMode && (S(i.wrapperEl, "--swiper-centered-offset-before", ""), S(i.wrapperEl, "--swiper-centered-offset-after", ""));
            var T = a.grid && 1 < a.grid.rows && i.grid;
            let t;
            T && i.grid.initSlides(p);
            var C = "auto" === a.slidesPerView && a.breakpoints && 0 < Object.keys(a.breakpoints).filter(e => void 0 !== a.breakpoints[e].slidesPerView).length;
            for (let e = 0; e < p; e += 1) {
              t = 0;
              const l = h.eq(e);
              if (T && i.grid.updateSlide(e, l, p, s), "none" !== l.css("display")) {
                if ("auto" === a.slidesPerView) {
                  C && (h[e].style[s("width")] = "");
                  const o = getComputedStyle(l[0]),
                    d = l[0].style.transform,
                    c = l[0].style.webkitTransform;
                  if (d && (l[0].style.transform = "none"), c && (l[0].style.webkitTransform = "none"), a.roundLengths) t = i.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0);
                  else {
                    const i = n(o, "width"),
                      s = n(o, "padding-left"),
                      a = n(o, "padding-right"),
                      r = n(o, "margin-left"),
                      d = n(o, "margin-right"),
                      c = o.getPropertyValue("box-sizing");
                    if (c && "border-box" === c) t = i + r + d;
                    else {
                      const {
                        clientWidth: n,
                        offsetWidth: o
                      } = l[0];
                      t = i + s + a + r + d + (o - n)
                    }
                  }
                  d && (l[0].style.transform = d), c && (l[0].style.webkitTransform = c), a.roundLengths && (t = Math.floor(t))
                } else t = (o - (a.slidesPerView - 1) * w) / a.slidesPerView, a.roundLengths && (t = Math.floor(t)), h[e] && (h[e].style[s("width")] = t + "px");
                h[e] && (h[e].swiperSlideSize = t), m.push(t), a.centeredSlides ? (x = x + t / 2 + _ / 2 + w, 0 === _ && 0 !== e && (x = x - o / 2 - w), 0 === e && (x = x - o / 2 - w), Math.abs(x) < .001 && (x = 0), a.roundLengths && (x = Math.floor(x)), E % a.slidesPerGroup == 0 && u.push(x), f.push(x)) : (a.roundLengths && (x = Math.floor(x)), (E - Math.min(i.params.slidesPerGroupSkip, E)) % i.params.slidesPerGroup == 0 && u.push(x), f.push(x), x = x + t + w), i.virtualSize += t + w, _ = t, E += 1
              }
            }
            if (i.virtualSize = Math.max(i.virtualSize, o) + v, l && d && ("slide" === a.effect || "coverflow" === a.effect) && r.css({
                width: i.virtualSize + a.spaceBetween + "px"
              }), a.setWrapperSize && r.css({
                [s("width")]: i.virtualSize + a.spaceBetween + "px"
              }), T && i.grid.updateWrapperSize(t, u, s), !a.centeredSlides) {
              const s = [];
              for (let t = 0; t < u.length; t += 1) {
                let e = u[t];
                a.roundLengths && (e = Math.floor(e)), u[t] <= i.virtualSize - o && s.push(e)
              }
              u = s, 1 < Math.floor(i.virtualSize - o) - Math.floor(u[u.length - 1]) && u.push(i.virtualSize - o)
            }
            if (0 === u.length && (u = [0]), 0 !== a.spaceBetween) {
              const n = i.isHorizontal() && l ? "marginLeft" : s("marginRight");
              h.filter((e, t) => !a.cssMode || t !== h.length - 1).css({
                [n]: w + "px"
              })
            }
            if (a.centeredSlides && a.centeredSlidesBounds) {
              let t = 0;
              m.forEach(e => {
                t += e + (a.spaceBetween || 0)
              });
              const s = (t -= a.spaceBetween) - o;
              u = u.map(e => e < 0 ? -g : e > s ? s + v : e)
            }
            if (a.centerInsufficientSlides) {
              let t = 0;
              if (m.forEach(e => {
                  t += e + (a.spaceBetween || 0)
                }), (t -= a.spaceBetween) < o) {
                const s = (o - t) / 2;
                u.forEach((e, t) => {
                  u[t] = e - s
                }), f.forEach((e, t) => {
                  f[t] = e + s
                })
              }
            }
            if (Object.assign(i, {
                slides: h,
                snapGrid: u,
                slidesGrid: f,
                slidesSizesGrid: m
              }), a.centeredSlides && a.cssMode && !a.centeredSlidesBounds) {
              S(i.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"), S(i.wrapperEl, "--swiper-centered-offset-after", i.size / 2 - m[m.length - 1] / 2 + "px");
              const s = -i.snapGrid[0],
                n = -i.slidesGrid[0];
              i.snapGrid = i.snapGrid.map(e => e + s), i.slidesGrid = i.slidesGrid.map(e => e + n)
            }
            if (p !== e && i.emit("slidesLengthChange"), u.length !== b && (i.params.watchOverflow && i.checkOverflow(), i.emit("snapGridLengthChange")), f.length !== y && i.emit("slidesGridLengthChange"), a.watchSlidesProgress && i.updateSlidesOffset(), !(c || a.cssMode || "slide" !== a.effect && "fade" !== a.effect)) {
              const s = a.containerModifierClass + "backface-hidden",
                n = i.$el.hasClass(s);
              p <= a.maxBackfaceHiddenSlides ? n || i.$el.addClass(s) : n && i.$el.removeClass(s)
            }
          }
        },
        updateAutoHeight: function (e) {
          const i = this,
            t = [],
            s = i.virtual && i.params.virtual.enabled;
          let n, a = 0;
          "number" == typeof e ? i.setTransition(e) : !0 === e && i.setTransition(i.params.speed);
          var r = t => (s ? i.slides.filter(e => parseInt(e.getAttribute("data-swiper-slide-index"), 10) === t) : i.slides.eq(t))[0];
          if ("auto" !== i.params.slidesPerView && 1 < i.params.slidesPerView)
            if (i.params.centeredSlides)(i.visibleSlides || L([])).each(e => {
              t.push(e)
            });
            else
              for (n = 0; n < Math.ceil(i.params.slidesPerView); n += 1) {
                const e = i.activeIndex + n;
                if (e > i.slides.length && !s) break;
                t.push(r(e))
              } else t.push(r(i.activeIndex));
          for (n = 0; n < t.length; n += 1)
            if (void 0 !== t[n]) {
              const e = t[n].offsetHeight;
              a = e > a ? e : a
            }! a && 0 !== a || i.$wrapperEl.css("height", a + "px")
        },
        updateSlidesOffset: function () {
          var t = this.slides;
          for (let e = 0; e < t.length; e += 1) t[e].swiperSlideOffset = this.isHorizontal() ? t[e].offsetLeft : t[e].offsetTop
        },
        updateSlidesProgress: function (e) {
          void 0 === e && (e = this && this.translate || 0);
          var s = this,
            n = s.params,
            {
              slides: a,
              rtlTranslate: r,
              snapGrid: o
            } = s;
          if (0 !== a.length) {
            void 0 === a[0].swiperSlideOffset && s.updateSlidesOffset();
            let i = r ? e : -e;
            a.removeClass(n.slideVisibleClass), s.visibleSlidesIndexes = [], s.visibleSlides = [];
            for (let t = 0; t < a.length; t += 1) {
              var l = a[t];
              let e = l.swiperSlideOffset;
              n.cssMode && n.centeredSlides && (e -= a[0].swiperSlideOffset);
              const L = (i + (n.centeredSlides ? s.minTranslate() : 0) - e) / (l.swiperSlideSize + n.spaceBetween),
                d = (i - o[0] + (n.centeredSlides ? s.minTranslate() : 0) - e) / (l.swiperSlideSize + n.spaceBetween),
                c = -(i - e),
                h = c + s.slidesSizesGrid[t];
              (0 <= c && c < s.size - 1 || 1 < h && h <= s.size || c <= 0 && h >= s.size) && (s.visibleSlides.push(l), s.visibleSlidesIndexes.push(t), a.eq(t).addClass(n.slideVisibleClass)), l.progress = r ? -L : L, l.originalProgress = r ? -d : d
            }
            s.visibleSlides = L(s.visibleSlides)
          }
        },
        updateProgress: function (e) {
          var t = this;
          if (void 0 === e) {
            const i = t.rtlTranslate ? -1 : 1;
            e = t && t.translate && t.translate * i || 0
          }
          const i = t.params,
            s = t.maxTranslate() - t.minTranslate();
          let {
            progress: n,
            isBeginning: a,
            isEnd: r
          } = t;
          var o = a,
            l = r;
          r = 0 == s ? (n = 0, a = !0) : (n = (e - t.minTranslate()) / s, a = n <= 0, 1 <= n), Object.assign(t, {
            progress: n,
            isBeginning: a,
            isEnd: r
          }), (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), a && !o && t.emit("reachBeginning toEdge"), r && !l && t.emit("reachEnd toEdge"), (o && !a || l && !r) && t.emit("fromEdge"), t.emit("progress", n)
        },
        updateSlidesClasses: function () {
          var {
            slides: e,
            params: t,
            $wrapperEl: i,
            activeIndex: s,
            realIndex: n
          } = this, a = this.virtual && t.virtual.enabled;
          e.removeClass(`${t.slideActiveClass} ${t.slideNextClass} ${t.slidePrevClass} ${t.slideDuplicateActiveClass} ${t.slideDuplicateNextClass} ` + t.slideDuplicatePrevClass), (a = a ? this.$wrapperEl.find(`.${t.slideClass}[data-swiper-slide-index="${s}"]`) : e.eq(s)).addClass(t.slideActiveClass), t.loop && (a.hasClass(t.slideDuplicateClass) ? i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${n}"]`) : i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${n}"]`)).addClass(t.slideDuplicateActiveClass);
          let r = a.nextAll("." + t.slideClass).eq(0).addClass(t.slideNextClass),
            o = (t.loop && 0 === r.length && (r = e.eq(0)).addClass(t.slideNextClass), a.prevAll("." + t.slideClass).eq(0).addClass(t.slidePrevClass));
          t.loop && 0 === o.length && (o = e.eq(-1)).addClass(t.slidePrevClass), t.loop && ((r.hasClass(t.slideDuplicateClass) ? i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${r.attr("data-swiper-slide-index")}"]`) : i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${r.attr("data-swiper-slide-index")}"]`)).addClass(t.slideDuplicateNextClass), (o.hasClass(t.slideDuplicateClass) ? i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`) : i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`)).addClass(t.slideDuplicatePrevClass)), this.emitSlidesClasses()
        },
        updateActiveIndex: function (e) {
          var t = this,
            i = t.rtlTranslate ? t.translate : -t.translate,
            {
              slidesGrid: s,
              snapGrid: n,
              params: a,
              activeIndex: r,
              realIndex: o,
              snapIndex: l
            } = t;
          let d, c = e;
          if (void 0 === c) {
            for (let e = 0; e < s.length; e += 1) void 0 !== s[e + 1] ? i >= s[e] && i < s[e + 1] - (s[e + 1] - s[e]) / 2 ? c = e : i >= s[e] && i < s[e + 1] && (c = e + 1) : i >= s[e] && (c = e);
            a.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
          }
          if (0 <= n.indexOf(i)) d = n.indexOf(i);
          else {
            const e = Math.min(a.slidesPerGroupSkip, c);
            d = e + Math.floor((c - e) / a.slidesPerGroup)
          }
          d >= n.length && (d = n.length - 1), c === r ? d !== l && (t.snapIndex = d, t.emit("snapIndexChange")) : (e = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10), Object.assign(t, {
            snapIndex: d,
            realIndex: e,
            previousIndex: r,
            activeIndex: c
          }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), o !== e && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange"))
        },
        updateClickedSlide: function (e) {
          var t = this,
            i = t.params,
            s = L(e).closest("." + i.slideClass)[0];
          let n, a = !1;
          if (s)
            for (let e = 0; e < t.slides.length; e += 1)
              if (t.slides[e] === s) {
                a = !0, n = e;
                break
              } s && a ? (t.clickedSlide = s, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(L(s).attr("data-swiper-slide-index"), 10) : t.clickedIndex = n, i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()) : (t.clickedSlide = void 0, t.clickedIndex = void 0)
        }
      },
      translate: {
        getTranslate: function (e) {
          void 0 === e && (e = this.isHorizontal() ? "x" : "y");
          var {
            params: t,
            rtlTranslate: i,
            translate: s,
            $wrapperEl: n
          } = this;
          if (t.virtualTranslate) return i ? -s : s;
          if (t.cssMode) return s;
          let a = $(n[0], e);
          return (a = i ? -a : a) || 0
        },
        setTranslate: function (e, t) {
          var i = this,
            {
              rtlTranslate: s,
              params: n,
              $wrapperEl: a,
              wrapperEl: r,
              progress: o
            } = i;
          let l = 0,
            d = 0;
          i.isHorizontal() ? l = s ? -e : e : d = e, n.roundLengths && (l = Math.floor(l), d = Math.floor(d)), n.cssMode ? r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -l : -d : n.virtualTranslate || a.transform(`translate3d(${l}px, ${d}px, 0px)`), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? l : d;
          s = i.maxTranslate() - i.minTranslate();
          (0 == s ? 0 : (e - i.minTranslate()) / s) !== o && i.updateProgress(e), i.emit("setTranslate", i.translate, t)
        },
        minTranslate: function () {
          return -this.snapGrid[0]
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function (e, t, i, s, n) {
          void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0);
          const a = this,
            {
              params: r,
              wrapperEl: o
            } = a;
          if (a.animating && r.preventInteractionOnTransition) return !1;
          var l = a.minTranslate(),
            d = a.maxTranslate(),
            l = s && l < e ? l : s && e < d ? d : e;
          if (a.updateProgress(l), r.cssMode) {
            const e = a.isHorizontal();
            if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -l;
            else {
              if (!a.support.smoothScroll) return b({
                swiper: a,
                targetPosition: -l,
                side: e ? "left" : "top"
              }), !0;
              o.scrollTo({
                [e ? "left" : "top"]: -l,
                behavior: "smooth"
              })
            }
          } else 0 === t ? (a.setTransition(0), a.setTranslate(l), i && (a.emit("beforeTransitionStart", t, n), a.emit("transitionEnd"))) : (a.setTransition(t), a.setTranslate(l), i && (a.emit("beforeTransitionStart", t, n), a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd || (a.onTranslateToWrapperTransitionEnd = function (e) {
            a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd), a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, i) && a.emit("transitionEnd")
          }), a.$wrapperEl[0].addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onTranslateToWrapperTransitionEnd)));
          return !0
        }
      },
      transition: {
        setTransition: function (e, t) {
          this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          var i = this["params"];
          i.cssMode || (i.autoHeight && this.updateAutoHeight(), h({
            swiper: this,
            runCallbacks: e,
            direction: t,
            step: "Start"
          }))
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          var i = this["params"];
          this.animating = !1, i.cssMode || (this.setTransition(0), h({
            swiper: this,
            runCallbacks: e,
            direction: t,
            step: "End"
          }))
        }
      },
      slide: {
        slideTo: function (e, t, i, s, n) {
          if (void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), "number" != typeof (e = void 0 === e ? 0 : e) && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
          if ("string" == typeof e) {
            const t = parseInt(e, 10);
            if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
            e = t
          }
          const a = this;
          let r = e;
          r < 0 && (r = 0);
          var {
            params: e,
            snapGrid: o,
            slidesGrid: l,
            previousIndex: d,
            activeIndex: c,
            rtlTranslate: h,
            wrapperEl: p,
            enabled: u
          } = a;
          if (a.animating && e.preventInteractionOnTransition || !u && !s && !n) return !1;
          u = Math.min(a.params.slidesPerGroupSkip, r);
          let f = u + Math.floor((r - u) / a.params.slidesPerGroup);
          var m = -o[f = f >= o.length ? o.length - 1 : f];
          if (e.normalizeSlideIndex)
            for (let e = 0; e < l.length; e += 1) {
              const t = -Math.floor(100 * m),
                i = Math.floor(100 * l[e]),
                s = Math.floor(100 * l[e + 1]);
              void 0 !== l[e + 1] ? t >= i && t < s - (s - i) / 2 ? r = e : t >= i && t < s && (r = e + 1) : t >= i && (r = e)
            }
          if (a.initialized && r !== c) {
            if (!a.allowSlideNext && m < a.translate && m < a.minTranslate()) return !1;
            if (!a.allowSlidePrev && m > a.translate && m > a.maxTranslate() && (c || 0) !== r) return !1
          }
          let g;
          if (r !== (d || 0) && i && a.emit("beforeSlideChangeStart"), a.updateProgress(m), g = r > c ? "next" : r < c ? "prev" : "reset", h && -m === a.translate || !h && m === a.translate) return a.updateActiveIndex(r), e.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== e.effect && a.setTranslate(m), "reset" != g && (a.transitionStart(i, g), a.transitionEnd(i, g)), !1;
          if (e.cssMode) {
            const e = a.isHorizontal(),
              i = h ? m : -m;
            if (0 === t) {
              const t = a.virtual && a.params.virtual.enabled;
              t && (a.wrapperEl.style.scrollSnapType = "none", a._immediateVirtual = !0), p[e ? "scrollLeft" : "scrollTop"] = i, t && requestAnimationFrame(() => {
                a.wrapperEl.style.scrollSnapType = "", a._swiperImmediateVirtual = !1
              })
            } else {
              if (!a.support.smoothScroll) return b({
                swiper: a,
                targetPosition: i,
                side: e ? "left" : "top"
              }), !0;
              p.scrollTo({
                [e ? "left" : "top"]: i,
                behavior: "smooth"
              })
            }
          } else a.setTransition(t), a.setTranslate(m), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, g), 0 === t ? a.transitionEnd(i, g) : a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function (e) {
            a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(i, g))
          }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd));
          return !0
        },
        slideToLoop: function (e, t, i, s) {
          if (void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), "string" == typeof (e = void 0 === e ? 0 : e)) {
            const t = parseInt(e, 10);
            if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
            e = t
          }
          let n = e;
          return this.params.loop && (n += this.loopedSlides), this.slideTo(n, t, i, s)
        },
        slideNext: function (e, t, i) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          var s = this,
            {
              animating: n,
              enabled: a,
              params: r
            } = s;
          if (!a) return s;
          let o = r.slidesPerGroup;
          "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
          a = s.activeIndex < r.slidesPerGroupSkip ? 1 : o;
          if (r.loop) {
            if (n && r.loopPreventsSlide) return !1;
            s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft
          }
          return r.rewind && s.isEnd ? s.slideTo(0, e, t, i) : s.slideTo(s.activeIndex + a, e, t, i)
        },
        slidePrev: function (e, t, i) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          const s = this,
            {
              params: n,
              animating: a,
              snapGrid: r,
              slidesGrid: o,
              rtlTranslate: l,
              enabled: d
            } = s;
          if (!d) return s;
          if (n.loop) {
            if (a && n.loopPreventsSlide) return !1;
            s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft
          }

          function c(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
          }
          const h = c(l ? s.translate : -s.translate),
            p = r.map(e => c(e));
          let u = r[p.indexOf(h) - 1];
          if (void 0 === u && n.cssMode) {
            let i;
            r.forEach((e, t) => {
              h >= e && (i = t)
            }), void 0 !== i && (u = r[0 < i ? i - 1 : i])
          }
          let f = 0;
          if (void 0 !== u && ((f = o.indexOf(u)) < 0 && (f = s.activeIndex - 1), "auto" === n.slidesPerView) && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (f = f - s.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0)), n.rewind && s.isBeginning) {
            const n = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
            return s.slideTo(n, e, t, i)
          }
          return s.slideTo(f, e, t, i)
        },
        slideReset: function (e, t, i) {
          return void 0 === e && (e = this.params.speed), this.slideTo(this.activeIndex, e, t = void 0 === t ? !0 : t, i)
        },
        slideToClosest: function (e, t, i, s) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === s && (s = .5);
          var n = this;
          let a = n.activeIndex;
          var r = Math.min(n.params.slidesPerGroupSkip, a),
            r = r + Math.floor((a - r) / n.params.slidesPerGroup),
            o = n.rtlTranslate ? n.translate : -n.translate;
          if (o >= n.snapGrid[r]) {
            const e = n.snapGrid[r];
            o - e > (n.snapGrid[r + 1] - e) * s && (a += n.params.slidesPerGroup)
          } else {
            const e = n.snapGrid[r - 1];
            o - e <= (n.snapGrid[r] - e) * s && (a -= n.params.slidesPerGroup)
          }
          return a = Math.max(a, 0), a = Math.min(a, n.slidesGrid.length - 1), n.slideTo(a, e, t, i)
        },
        slideToClickedSlide: function () {
          const e = this,
            {
              params: t,
              $wrapperEl: i
            } = e,
            s = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
          let n, a = e.clickedIndex;
          t.loop ? e.animating || (n = parseInt(L(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? a < e.loopedSlides - s / 2 || a > e.slides.length - e.loopedSlides + s / 2 ? (e.loopFix(), a = i.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), C(() => {
            e.slideTo(a)
          })) : e.slideTo(a) : a > e.slides.length - s ? (e.loopFix(), a = i.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), C(() => {
            e.slideTo(a)
          })) : e.slideTo(a)) : e.slideTo(a)
        }
      },
      loop: {
        loopCreate: function () {
          const t = this,
            i = T(),
            {
              params: s,
              $wrapperEl: e
            } = t,
            n = 0 < e.children().length ? L(e.children()[0].parentNode) : e;
          n.children(`.${s.slideClass}.` + s.slideDuplicateClass).remove();
          let a = n.children("." + s.slideClass);
          if (s.loopFillGroupWithBlank) {
            const t = s.slidesPerGroup - a.length % s.slidesPerGroup;
            if (t !== s.slidesPerGroup) {
              for (let e = 0; e < t; e += 1) {
                const t = L(i.createElement("div")).addClass(s.slideClass + " " + s.slideBlankClass);
                n.append(t)
              }
              a = n.children("." + s.slideClass)
            }
          }
          "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = a.length), t.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10)), t.loopedSlides += s.loopAdditionalSlides, t.loopedSlides > a.length && t.params.loopedSlidesLimit && (t.loopedSlides = a.length);
          var r = [],
            o = [];
          a.each((e, t) => {
            L(e).attr("data-swiper-slide-index", t)
          });
          for (let e = 0; e < t.loopedSlides; e += 1) {
            const t = e - Math.floor(e / a.length) * a.length;
            o.push(a.eq(t)[0]), r.unshift(a.eq(a.length - t - 1)[0])
          }
          for (let e = 0; e < o.length; e += 1) n.append(L(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
          for (let e = r.length - 1; 0 <= e; --e) n.prepend(L(r[e].cloneNode(!0)).addClass(s.slideDuplicateClass))
        },
        loopFix: function () {
          var e = this,
            {
              activeIndex: t,
              slides: i,
              loopedSlides: s,
              allowSlidePrev: n,
              allowSlideNext: a,
              snapGrid: r,
              rtlTranslate: o
            } = (e.emit("beforeLoopFix"), e);
          let l;
          e.allowSlidePrev = !0, e.allowSlideNext = !0;
          r = -r[t] - e.getTranslate();
          t < s ? (l = i.length - 3 * s + t, l += s, e.slideTo(l, 0, !1, !0) && 0 != r && e.setTranslate((o ? -e.translate : e.translate) - r)) : t >= i.length - s && (l = -i.length + t + s, l += s, e.slideTo(l, 0, !1, !0)) && 0 != r && e.setTranslate((o ? -e.translate : e.translate) - r), e.allowSlidePrev = n, e.allowSlideNext = a, e.emit("loopFix")
        },
        loopDestroy: function () {
          var {
            $wrapperEl: e,
            params: t,
            slides: i
          } = this;
          e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.` + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
        }
      },
      grabCursor: {
        setGrabCursor: function (e) {
          var t = this;
          t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode || ((t = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl).style.cursor = "move", t.style.cursor = e ? "grabbing" : "grab")
        },
        unsetGrabCursor: function () {
          var e = this;
          e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
        }
      },
      events: {
        attachEvents: function () {
          var e = this,
            t = T(),
            {
              params: i,
              support: s
            } = e;
          e.onTouchStart = function (e) {
            var s = this,
              n = T(),
              a = P(),
              r = s.touchEventsData,
              {
                params: o,
                touches: l,
                enabled: d
              } = s;
            if (d && (!s.animating || !o.preventInteractionOnTransition)) {
              !s.animating && o.cssMode && o.loop && s.loopFix();
              let t = e,
                i = L((t = t.originalEvent ? t.originalEvent : t).target);
              if (("wrapper" !== o.touchEventsTarget || i.closest(s.wrapperEl).length) && (r.isTouchEvent = "touchstart" === t.type, r.isTouchEvent || !("which" in t) || 3 !== t.which) && !(!r.isTouchEvent && "button" in t && 0 < t.button || r.isTouched && r.isMoved)) {
                var d = !!o.noSwipingClass && "" !== o.noSwipingClass,
                  c = e.composedPath ? e.composedPath() : e.path,
                  d = (d && t.target && t.target.shadowRoot && c && (i = L(c[0])), o.noSwipingSelector || "." + o.noSwipingClass),
                  c = !(!t.target || !t.target.shadowRoot);
                if (o.noSwiping && (c ? function (s, e) {
                    return function e(t) {
                      var i;
                      return t && t !== T() && t !== P() && ((i = (t = t.assignedSlot ? t.assignedSlot : t).closest(s)) || t.getRootNode) ? i || e(t.getRootNode().host) : null
                    }(e = void 0 === e ? this : e)
                  }(d, i[0]) : i.closest(d)[0])) s.allowClick = !0;
                else if (!o.swipeHandler || i.closest(o.swipeHandler)[0]) {
                  l.currentX = ("touchstart" === t.type ? t.targetTouches[0] : t).pageX, l.currentY = ("touchstart" === t.type ? t.targetTouches[0] : t).pageY;
                  var c = l.currentX,
                    d = l.currentY,
                    h = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
                    p = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
                  if (h && (c <= p || c >= a.innerWidth - p)) {
                    if ("prevent" !== h) return;
                    e.preventDefault()
                  }
                  if (Object.assign(r, {
                      isTouched: !0,
                      isMoved: !1,
                      allowTouchCallbacks: !0,
                      isScrolling: void 0,
                      startMoving: void 0
                    }), l.startX = c, l.startY = d, r.touchStartTime = v(), s.allowClick = !0, s.updateSize(), s.swipeDirection = void 0, 0 < o.threshold && (r.allowThresholdMove = !1), "touchstart" !== t.type) {
                    let e = !0;
                    i.is(r.focusableElements) && (e = !1, "SELECT" === i[0].nodeName) && (r.isTouched = !1), n.activeElement && L(n.activeElement).is(r.focusableElements) && n.activeElement !== i[0] && n.activeElement.blur();
                    const T = e && s.allowTouchMove && o.touchStartPreventDefault;
                    !o.touchStartForcePreventDefault && !T || i[0].isContentEditable || t.preventDefault()
                  }
                  s.params.freeMode && s.params.freeMode.enabled && s.freeMode && s.animating && !o.cssMode && s.freeMode.onTouchStart(), s.emit("touchStart", t)
                }
              }
            }
          }.bind(e), e.onTouchMove = function (e) {
            var n = T(),
              a = this,
              r = a.touchEventsData,
              {
                params: o,
                touches: l,
                rtlTranslate: d,
                enabled: t
              } = a;
            if (t) {
              let s = e;
              if (s.originalEvent && (s = s.originalEvent), r.isTouched) {
                if (!r.isTouchEvent || "touchmove" === s.type) {
                  t = "touchmove" === s.type && s.targetTouches && (s.targetTouches[0] || s.changedTouches[0]), e = ("touchmove" === s.type ? t : s).pageX, t = ("touchmove" === s.type ? t : s).pageY;
                  if (s.preventedByNestedSwiper) l.startX = e, l.startY = t;
                  else if (a.allowTouchMove) {
                    if (r.isTouchEvent && o.touchReleaseOnEdges && !o.loop)
                      if (a.isVertical()) {
                        if (t < l.startY && a.translate <= a.maxTranslate() || t > l.startY && a.translate >= a.minTranslate()) return r.isTouched = !1, void(r.isMoved = !1)
                      } else if (e < l.startX && a.translate <= a.maxTranslate() || e > l.startX && a.translate >= a.minTranslate()) return;
                    if (r.isTouchEvent && n.activeElement && s.target === n.activeElement && L(s.target).is(r.focusableElements)) r.isMoved = !0, a.allowClick = !1;
                    else if (r.allowTouchCallbacks && a.emit("touchMove", s), !(s.targetTouches && 1 < s.targetTouches.length)) {
                      l.currentX = e, l.currentY = t;
                      var i, n = l.currentX - l.startX,
                        c = l.currentY - l.startY;
                      if (!(a.params.threshold && Math.sqrt(n ** 2 + c ** 2) < a.params.threshold))
                        if (void 0 === r.isScrolling && (a.isHorizontal() && l.currentY === l.startY || a.isVertical() && l.currentX === l.startX ? r.isScrolling = !1 : 25 <= n * n + c * c && (i = 180 * Math.atan2(Math.abs(c), Math.abs(n)) / Math.PI, r.isScrolling = a.isHorizontal() ? i > o.touchAngle : 90 - i > o.touchAngle)), r.isScrolling && a.emit("touchMoveOpposite", s), void 0 !== r.startMoving || l.currentX === l.startX && l.currentY === l.startY || (r.startMoving = !0), r.isScrolling) r.isTouched = !1;
                        else if (r.startMoving) {
                        a.allowClick = !1, !o.cssMode && s.cancelable && s.preventDefault(), o.touchMoveStopPropagation && !o.nested && s.stopPropagation(), r.isMoved || (o.loop && !o.cssMode && a.loopFix(), r.startTranslate = a.getTranslate(), a.setTransition(0), a.animating && a.$wrapperEl.trigger("webkitTransitionEnd transitionend"), r.allowMomentumBounce = !1, !o.grabCursor || !0 !== a.allowSlideNext && !0 !== a.allowSlidePrev || a.setGrabCursor(!0), a.emit("sliderFirstMove", s)), a.emit("sliderMove", s), r.isMoved = !0;
                        let e = a.isHorizontal() ? n : c,
                          t = (l.diff = e, e *= o.touchRatio, d && (e = -e), a.swipeDirection = 0 < e ? "prev" : "next", r.currentTranslate = e + r.startTranslate, !0),
                          i = o.resistanceRatio;
                        if (o.touchReleaseOnEdges && (i = 0), 0 < e && r.currentTranslate > a.minTranslate() ? (t = !1, o.resistance && (r.currentTranslate = a.minTranslate() - 1 + (-a.minTranslate() + r.startTranslate + e) ** i)) : e < 0 && r.currentTranslate < a.maxTranslate() && (t = !1, o.resistance) && (r.currentTranslate = a.maxTranslate() + 1 - (a.maxTranslate() - r.startTranslate - e) ** i), t && (s.preventedByNestedSwiper = !0), !a.allowSlideNext && "next" === a.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate), !a.allowSlidePrev && "prev" === a.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate), a.allowSlidePrev || a.allowSlideNext || (r.currentTranslate = r.startTranslate), 0 < o.threshold) {
                          if (!(Math.abs(e) > o.threshold || r.allowThresholdMove)) return void(r.currentTranslate = r.startTranslate);
                          if (!r.allowThresholdMove) return r.allowThresholdMove = !0, l.startX = l.currentX, l.startY = l.currentY, r.currentTranslate = r.startTranslate, void(l.diff = a.isHorizontal() ? l.currentX - l.startX : l.currentY - l.startY)
                        }
                        o.followFinger && !o.cssMode && ((o.freeMode && o.freeMode.enabled && a.freeMode || o.watchSlidesProgress) && (a.updateActiveIndex(), a.updateSlidesClasses()), a.params.freeMode && o.freeMode.enabled && a.freeMode && a.freeMode.onTouchMove(), a.updateProgress(r.currentTranslate), a.setTranslate(r.currentTranslate))
                      }
                    }
                  } else L(s.target).is(r.focusableElements) || (a.allowClick = !1), r.isTouched && (Object.assign(l, {
                    startX: e,
                    startY: t,
                    currentX: e,
                    currentY: t
                  }), r.touchStartTime = v())
                }
              } else r.startMoving && r.isScrolling && a.emit("touchMoveOpposite", s)
            }
          }.bind(e), e.onTouchEnd = function (a) {
            const r = this,
              e = r.touchEventsData,
              {
                params: o,
                touches: t,
                rtlTranslate: i,
                slidesGrid: l,
                enabled: s
              } = r;
            if (s) {
              let n = a;
              if (n.originalEvent && (n = n.originalEvent), e.allowTouchCallbacks && r.emit("touchEnd", n), e.allowTouchCallbacks = !1, e.isTouched) {
                o.grabCursor && e.isMoved && e.isTouched && (!0 === r.allowSlideNext || !0 === r.allowSlidePrev) && r.setGrabCursor(!1);
                var d, c = v(),
                  h = c - e.touchStartTime;
                if (r.allowClick) {
                  const a = n.path || n.composedPath && n.composedPath();
                  r.updateClickedSlide(a && a[0] || n.target), r.emit("tap click", n), h < 300 && c - e.lastClickTime < 300 && r.emit("doubleTap doubleClick", n)
                }
                if (e.lastClickTime = v(), C(() => {
                    r.destroyed || (r.allowClick = !0)
                  }), e.isTouched && e.isMoved && r.swipeDirection && 0 !== t.diff && e.currentTranslate !== e.startTranslate) {
                  if (e.isTouched = !1, e.isMoved = !1, e.startMoving = !1, d = o.followFinger ? i ? r.translate : -r.translate : -e.currentTranslate, !o.cssMode)
                    if (r.params.freeMode && o.freeMode.enabled) r.freeMode.onTouchEnd({
                      currentPos: d
                    });
                    else {
                      let t = 0,
                        i = r.slidesSizesGrid[0];
                      for (let e = 0; e < l.length; e += e < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
                        const r = e < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
                        void 0 !== l[e + r] ? d >= l[e] && d < l[e + r] && (t = e, i = l[e + r] - l[e]) : d >= l[e] && (t = e, i = l[l.length - 1] - l[l.length - 2])
                      }
                      let e = null,
                        s = null;
                      o.rewind && (r.isBeginning ? s = r.params.virtual && r.params.virtual.enabled && r.virtual ? r.virtual.slides.length - 1 : r.slides.length - 1 : r.isEnd && (e = 0));
                      a = (d - l[t]) / i, c = t < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
                      h > o.longSwipesMs ? o.longSwipes ? ("next" === r.swipeDirection && (a >= o.longSwipesRatio ? r.slideTo(o.rewind && r.isEnd ? e : t + c) : r.slideTo(t)), "prev" === r.swipeDirection && (a > 1 - o.longSwipesRatio ? r.slideTo(t + c) : null !== s && a < 0 && Math.abs(a) > o.longSwipesRatio ? r.slideTo(s) : r.slideTo(t))) : r.slideTo(r.activeIndex) : o.shortSwipes ? !r.navigation || n.target !== r.navigation.nextEl && n.target !== r.navigation.prevEl ? ("next" === r.swipeDirection && r.slideTo(null !== e ? e : t + c), "prev" === r.swipeDirection && r.slideTo(null !== s ? s : t)) : n.target === r.navigation.nextEl ? r.slideTo(t + c) : r.slideTo(t) : r.slideTo(r.activeIndex)
                    }
                } else e.isTouched = !1, e.isMoved = !1, e.startMoving = !1
              } else e.isMoved && o.grabCursor && r.setGrabCursor(!1), e.isMoved = !1, e.startMoving = !1
            }
          }.bind(e), i.cssMode && (e.onScroll = function () {
            var e = this,
              {
                wrapperEl: t,
                rtlTranslate: i,
                enabled: s
              } = e;
            s && (e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses(), (0 == (s = e.maxTranslate() - e.minTranslate()) ? 0 : (e.translate - e.minTranslate()) / s) !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1))
          }.bind(e)), e.onClick = function (e) {
            var t = this;
            t.enabled && !t.allowClick && (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation) && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())
          }.bind(e), s.touch && !m && (t.addEventListener("touchstart", j), m = !0), g(e, "on")
        },
        detachEvents: function () {
          g(this, "off")
        }
      },
      breakpoints: {
        setBreakpoint: function () {
          const s = this,
            {
              activeIndex: e,
              initialized: t,
              loopedSlides: i = 0,
              params: n,
              $el: a
            } = s,
            r = n.breakpoints;
          if (r && 0 !== Object.keys(r).length) {
            var o = s.getBreakpoint(r, s.params.breakpointsBase, s.el);
            if (o && s.currentBreakpoint !== o) {
              const c = (o in r ? r[o] : void 0) || s.originalParams,
                h = y(s, n),
                p = y(s, c),
                u = n.enabled;
              h && !p ? (a.removeClass(`${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`), s.emitContainerClasses()) : !h && p && (a.addClass(n.containerModifierClass + "grid"), (c.grid.fill && "column" === c.grid.fill || !c.grid.fill && "column" === n.grid.fill) && a.addClass(n.containerModifierClass + "grid-column"), s.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(e => {
                var t = n[e] && n[e].enabled,
                  i = c[e] && c[e].enabled;
                t && !i && s[e].disable(), !t && i && s[e].enable()
              });
              var l = c.direction && c.direction !== n.direction,
                d = n.loop && (c.slidesPerView !== n.slidesPerView || l),
                l = (l && t && s.changeDirection(), f(s.params, c), s.params.enabled);
              Object.assign(s, {
                allowTouchMove: s.params.allowTouchMove,
                allowSlideNext: s.params.allowSlideNext,
                allowSlidePrev: s.params.allowSlidePrev
              }), u && !l ? s.disable() : !u && l && s.enable(), s.currentBreakpoint = o, s.emit("_beforeBreakpoint", c), d && t && (s.loopDestroy(), s.loopCreate(), s.updateSlides(), s.slideTo(e - i + s.loopedSlides, 0, !1)), s.emit("breakpoint", c)
            }
          }
        },
        getBreakpoint: function (e, i, s) {
          if (void 0 === i && (i = "window"), e && ("container" !== i || s)) {
            let t = !1;
            const n = P(),
              a = "window" === i ? n.innerHeight : s.clientHeight,
              r = Object.keys(e).map(e => {
                var t;
                return "string" == typeof e && 0 === e.indexOf("@") ? (t = parseFloat(e.substr(1)), {
                  value: a * t,
                  point: e
                }) : {
                  value: e,
                  point: e
                }
              });
            r.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < r.length; e += 1) {
              const {
                point: P,
                value: a
              } = r[e];
              "window" === i ? n.matchMedia(`(min-width: ${a}px)`).matches && (t = P) : a <= s.clientWidth && (t = P)
            }
            return t || "max"
          }
        }
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            {
              isLocked: t,
              params: i
            } = e,
            s = i["slidesOffsetBefore"];
          if (s) {
            const t = e.slides.length - 1,
              i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * s;
            e.isLocked = e.size > i
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
        }
      },
      classes: {
        addClasses: function () {
          var {
            classNames: e,
            params: t,
            rtl: i,
            $el: s,
            device: n,
            support: a
          } = this, a = function (e, i) {
            const s = [];
            return e.forEach(t => {
              "object" == typeof t ? Object.keys(t).forEach(e => {
                t[e] && s.push(i + e)
              }) : "string" == typeof t && s.push(i + t)
            }), s
          }(["initialized", t.direction, {
            "pointer-events": !a.touch
          }, {
            "free-mode": this.params.freeMode && t.freeMode.enabled
          }, {
            autoheight: t.autoHeight
          }, {
            rtl: i
          }, {
            grid: t.grid && 1 < t.grid.rows
          }, {
            "grid-column": t.grid && 1 < t.grid.rows && "column" === t.grid.fill
          }, {
            android: n.android
          }, {
            ios: n.ios
          }, {
            "css-mode": t.cssMode
          }, {
            centered: t.cssMode && t.centeredSlides
          }, {
            "watch-progress": t.watchSlidesProgress
          }], t.containerModifierClass);
          e.push(...a), s.addClass([...e].join(" ")), this.emitContainerClasses()
        },
        removeClasses: function () {
          var {
            $el: e,
            classNames: t
          } = this;
          e.removeClass(t.join(" ")), this.emitContainerClasses()
        }
      },
      images: {
        loadImage: function (e, t, i, s, n, a) {
          var r = P();

          function o() {
            a && a()
          }!(L(e).parent("picture")[0] || e.complete && n) && t ? ((e = new r.Image).onload = o, e.onerror = o, s && (e.sizes = s), i && (e.srcset = i), t && (e.src = t)) : o()
        },
        preloadImages: function () {
          const t = this;

          function i() {
            null != t && t && !t.destroyed && (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1), t.imagesLoaded === t.imagesToLoad.length) && (t.params.updateOnImagesReady && t.update(), t.emit("imagesReady"))
          }
          t.imagesToLoad = t.$el.find("img");
          for (let e = 0; e < t.imagesToLoad.length; e += 1) {
            var s = t.imagesToLoad[e];
            t.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, i)
          }
        }
      }
    },
    _ = {};
  class E {
    constructor() {
      let t, i;
      for (var h, e = arguments.length, s = new Array(e), n = 0; n < e; n++) s[n] = arguments[n];
      if (1 === s.length && s[0].constructor && "Object" === Object.prototype.toString.call(s[0]).slice(8, -1) ? i = s[0] : [t, i] = s, i = f({}, i = i || {}), t && !i.el && (i.el = t), i.el && 1 < L(i.el).length) {
        const t = [];
        return L(i.el).each(e => {
          e = f({}, i, {
            el: e
          });
          t.push(new E(e))
        }), t
      }
      const a = this,
        r = (a.__swiper__ = !0, a.support = p(), a.device = (void 0 === (h = {
          userAgent: i.userAgent
        }) && (h = {}), c = c || function () {
          var e = (void 0 === h ? {} : h)["userAgent"],
            t = p(),
            i = P(),
            s = i.navigator.platform,
            e = e || i.navigator.userAgent,
            n = {
              ios: !1,
              android: !1
            },
            a = i.screen.width,
            i = i.screen.height,
            r = e.match(/(Android);?[\s\/]+([\d.]+)?/);
          let o = e.match(/(iPad).*OS\s([\d_]+)/);
          var l = e.match(/(iPod)(.*OS\s([\d_]+))?/),
            d = !o && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            c = "Win32" === s,
            s = "MacIntel" === s;
          return !o && s && t.touch && 0 <= ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(a + "x" + i) && (o = (o = e.match(/(Version)\/([\d.]+)/)) || [0, 1, "13_0_0"]), r && !c && (n.os = "android", n.android = !0), (o || d || l) && (n.os = "ios", n.ios = !0), n
        }()), a.browser = N(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], i.modules && Array.isArray(i.modules) && a.modules.push(...i.modules), {});
      a.modules.forEach(e => {
        var s, n;
        e({
          swiper: a,
          extendParams: (s = i, n = r, function (e) {
            void 0 === e && (e = {});
            var t = Object.keys(e)[0],
              i = e[t];
            "object" == typeof i && null !== i && (0 <= ["navigation", "pagination", "scrollbar"].indexOf(t) && !0 === s[t] && (s[t] = {
              auto: !0
            }), t in s) && "enabled" in i && (!0 === s[t] && (s[t] = {
              enabled: !0
            }), "object" != typeof s[t] || "enabled" in s[t] || (s[t].enabled = !0), s[t] || (s[t] = {
              enabled: !1
            })), f(n, e)
          }),
          on: a.on.bind(a),
          once: a.once.bind(a),
          off: a.off.bind(a),
          emit: a.emit.bind(a)
        })
      });
      var o, l = f({}, w, r);
      return a.params = f({}, l, _, i), a.originalParams = f({}, a.params), a.passedParams = f({}, i), a.params && a.params.on && Object.keys(a.params.on).forEach(e => {
        a.on(e, a.params.on[e])
      }), a.params && a.params.onAny && a.onAny(a.params.onAny), a.$ = L, Object.assign(a, {
        enabled: a.params.enabled,
        el: t,
        classNames: [],
        slides: L(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal: () => "horizontal" === a.params.direction,
        isVertical: () => "vertical" === a.params.direction,
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: a.params.allowSlideNext,
        allowSlidePrev: a.params.allowSlidePrev,
        touchEvents: (l = ["touchstart", "touchmove", "touchend", "touchcancel"], o = ["pointerdown", "pointermove", "pointerup"], a.touchEventsTouch = {
          start: l[0],
          move: l[1],
          end: l[2],
          cancel: l[3]
        }, a.touchEventsDesktop = {
          start: o[0],
          move: o[1],
          end: o[2]
        }, a.support.touch || !a.params.simulateTouch ? a.touchEventsTouch : a.touchEventsDesktop),
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: a.params.focusableElements,
          lastClickTime: v(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          isTouchEvent: void 0,
          startMoving: void 0
        },
        allowClick: !0,
        allowTouchMove: a.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        imagesToLoad: [],
        imagesLoaded: 0
      }), a.emit("_swiper"), a.params.init && a.init(), a
    }
    enable() {
      var e = this;
      e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
    }
    disable() {
      var e = this;
      e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
    }
    setProgress(e, t) {
      var i = this,
        s = (e = Math.min(Math.max(e, 0), 1), i.minTranslate()),
        e = (i.maxTranslate() - s) * e + s;
      i.translateTo(e, void 0 === t ? 0 : t), i.updateActiveIndex(), i.updateSlidesClasses()
    }
    emitContainerClasses() {
      const t = this;
      var e;
      t.params._emitClasses && t.el && (e = t.el.className.split(" ").filter(e => 0 === e.indexOf("swiper") || 0 === e.indexOf(t.params.containerModifierClass)), t.emit("_containerClasses", e.join(" ")))
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ")
    }
    emitSlidesClasses() {
      const i = this;
      if (i.params._emitClasses && i.el) {
        const s = [];
        i.slides.each(e => {
          var t = i.getSlideClasses(e);
          s.push({
            slideEl: e,
            classNames: t
          }), i.emit("_slideClass", e, t)
        }), i.emit("_slideClasses", s)
      }
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      var {
        params: i,
        slides: s,
        slidesGrid: n,
        slidesSizesGrid: a,
        size: r,
        activeIndex: o
      } = this;
      let l = 1;
      if (i.centeredSlides) {
        let t, i = s[o].swiperSlideSize;
        for (let e = o + 1; e < s.length; e += 1) s[e] && !t && (i += s[e].swiperSlideSize, l += 1, i > r) && (t = !0);
        for (let e = o - 1; 0 <= e; --e) s[e] && !t && (i += s[e].swiperSlideSize, l += 1, i > r) && (t = !0)
      } else if ("current" === e)
        for (let e = o + 1; e < s.length; e += 1)(t ? n[e] + a[e] - n[o] < r : n[e] - n[o] < r) && (l += 1);
      else
        for (let e = o - 1; 0 <= e; --e) n[o] - n[e] < r && (l += 1);
      return l
    }
    update() {
      const t = this;
      var e, i;

      function s() {
        var e = t.rtlTranslate ? -1 * t.translate : t.translate,
          e = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
        t.setTranslate(e), t.updateActiveIndex(), t.updateSlidesClasses()
      }
      t && !t.destroyed && ({
        snapGrid: e,
        params: i
      } = t, i.breakpoints && t.setBreakpoint(), t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.params.freeMode && t.params.freeMode.enabled ? (s(), t.params.autoHeight && t.updateAutoHeight()) : (("auto" === t.params.slidesPerView || 1 < t.params.slidesPerView) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0)) || s(), i.watchOverflow && e !== t.snapGrid && t.checkOverflow(), t.emit("update"))
    }
    changeDirection(t, e) {
      void 0 === e && (e = !0);
      var i = this,
        s = i.params.direction;
      return (t = t || ("horizontal" === s ? "vertical" : "horizontal")) === s || "horizontal" !== t && "vertical" !== t || (i.$el.removeClass("" + i.params.containerModifierClass + s).addClass("" + i.params.containerModifierClass + t), i.emitContainerClasses(), i.params.direction = t, i.slides.each(e => {
        "vertical" === t ? e.style.width = "" : e.style.height = ""
      }), i.emit("changeDirection"), e && i.update()), i
    }
    changeLanguageDirection(e) {
      var t = this;
      t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.$el.addClass(t.params.containerModifierClass + "rtl"), t.el.dir = "rtl") : (t.$el.removeClass(t.params.containerModifierClass + "rtl"), t.el.dir = "ltr"), t.update())
    }
    mount(e) {
      const i = this;
      if (!i.mounted) {
        const n = L(e || i.params.el);
        if (!(e = n[0])) return !1;
        e.swiper = i;
        const a = () => "." + (i.params.wrapperClass || "").trim().split(" ").join(".");
        let t = e && e.shadowRoot && e.shadowRoot.querySelector ? ((s = L(e.shadowRoot.querySelector(a()))).children = e => n.children(e), s) : (n.children ? n : L(n)).children(a());
        var s;
        if (0 === t.length && i.params.createElements) {
          const e = T().createElement("div");
          t = L(e), e.className = i.params.wrapperClass, n.append(e), n.children("." + i.params.slideClass).each(e => {
            t.append(e)
          })
        }
        Object.assign(i, {
          $el: n,
          el: e,
          $wrapperEl: t,
          wrapperEl: t[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction"),
          rtlTranslate: "horizontal" === i.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction")),
          wrongRTL: "-webkit-box" === t.css("display")
        })
      }
      return !0
    }
    init(e) {
      var t = this;
      return t.initialized || !1 !== t.mount(e) && (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const i = this,
        {
          params: s,
          $el: n,
          $wrapperEl: a,
          slides: r
        } = i;
      if (void 0 !== i.params && !i.destroyed) {
        if (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), n.removeAttr("style"), a.removeAttr("style"), r) && r.length && r.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index"), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(e => {
            i.off(e)
          }), !1 !== e) {
          i.$el[0].swiper = null; {
            const o = i;
            Object.keys(o).forEach(e => {
              try {
                o[e] = null
              } catch (e) {}
              try {
                delete o[e]
              } catch (e) {}
            })
          }
        }
        i.destroyed = !0
      }
      return null
    }
    static extendDefaults(e) {
      f(_, e)
    }
    static get extendedDefaults() {
      return _
    }
    static get defaults() {
      return w
    }
    static installModule(e) {
      E.prototype.__modules__ || (E.prototype.__modules__ = []);
      var t = E.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
    }
    static use(e) {
      return Array.isArray(e) ? e.forEach(e => E.installModule(e)) : E.installModule(e), E
    }
  }

  function M(i, s, n, a) {
    const r = T();
    return i.params.createElements && Object.keys(a).forEach(t => {
      if (!n[t] && !0 === n.auto) {
        let e = i.$el.children("." + a[t])[0];
        e || ((e = r.createElement("div")).className = a[t], i.$el.append(e)), n[t] = e, s[t] = e
      }
    }), n
  }

  function k(e) {
    return "." + (e = void 0 === e ? "" : e).trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")
  }

  function A(e) {
    const {
      effect: i,
      swiper: s,
      on: t,
      setTranslate: n,
      setTransition: a,
      overwriteParams: r,
      perspective: o,
      recreateShadows: l,
      getEffectParams: d
    } = e;
    let c;
    t("beforeInit", () => {
      var e;
      s.params.effect === i && (s.classNames.push("" + s.params.containerModifierClass + i), o && o() && s.classNames.push(s.params.containerModifierClass + "3d"), e = r ? r() : {}, Object.assign(s.params, e), Object.assign(s.originalParams, e))
    }), t("setTranslate", () => {
      s.params.effect === i && n()
    }), t("setTransition", (e, t) => {
      s.params.effect === i && a(t)
    }), t("transitionEnd", () => {
      s.params.effect === i && l && d && d().slideShadows && (s.slides.each(e => {
        s.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()
      }), l())
    }), t("virtualUpdate", () => {
      s.params.effect === i && (s.slides.length || (c = !0), requestAnimationFrame(() => {
        c && s.slides && s.slides.length && (n(), c = !1)
      }))
    })
  }

  function O(e, t) {
    return e.transformEl ? t.find(e.transformEl).css({
      "backface-visibility": "hidden",
      "-webkit-backface-visibility": "hidden"
    }) : t
  }

  function I(e) {
    let {
      swiper: i,
      duration: t,
      transformEl: s,
      allSlides: n
    } = e;
    const {
      slides: a,
      activeIndex: r,
      $wrapperEl: o
    } = i;
    if (i.params.virtualTranslate && 0 !== t) {
      let e = !1;
      (n ? s ? a.find(s) : a : s ? a.eq(r).find(s) : a.eq(r)).transitionEnd(() => {
        if (!e && i && !i.destroyed) {
          e = !0, i.animating = !1;
          var t = ["webkitTransitionEnd", "transitionend"];
          for (let e = 0; e < t.length; e += 1) o.trigger(t[e])
        }
      })
    }
  }

  function z(e, t, i) {
    var s = "swiper-slide-shadow" + (i ? "-" + i : ""),
      e = e.transformEl ? t.find(e.transformEl) : t;
    let n = e.children("." + s);
    return n.length || (n = L(`<div class="swiper-slide-shadow${i?"-"+i:""}"></div>`), e.append(n)), n
  }
  return Object.keys(x).forEach(t => {
    Object.keys(x[t]).forEach(e => {
      E.prototype[e] = x[t][e]
    })
  }), E.use([function (e) {
    let {
      swiper: a,
      on: t,
      emit: i
    } = e;
    const s = P();
    let n = null,
      r = null;
    const o = () => {
        a && !a.destroyed && a.initialized && (i("beforeResize"), i("resize"))
      },
      l = () => {
        a && !a.destroyed && a.initialized && i("orientationchange")
      };
    t("init", () => {
      a.params.resizeObserver && void 0 !== s.ResizeObserver ? a && !a.destroyed && a.initialized && (n = new ResizeObserver(i => {
        r = s.requestAnimationFrame(() => {
          var {
            width: e,
            height: t
          } = a;
          let s = e,
            n = t;
          i.forEach(e => {
            var {
              contentBoxSize: e,
              contentRect: t,
              target: i
            } = e;
            i && i !== a.el || (s = t ? t.width : (e[0] || e).inlineSize, n = t ? t.height : (e[0] || e).blockSize)
          }), s === e && n === t || o()
        })
      })).observe(a.el) : (s.addEventListener("resize", o), s.addEventListener("orientationchange", l))
    }), t("destroy", () => {
      r && s.cancelAnimationFrame(r), n && n.unobserve && a.el && (n.unobserve(a.el), n = null), s.removeEventListener("resize", o), s.removeEventListener("orientationchange", l)
    })
  }, function (e) {
    let {
      swiper: i,
      extendParams: t,
      on: s,
      emit: n
    } = e;

    function a(e, t) {
      void 0 === t && (t = {});
      var i = new(o.MutationObserver || o.WebkitMutationObserver)(e => {
        var t;
        1 === e.length ? n("observerUpdate", e[0]) : (t = function () {
          n("observerUpdate", e[0])
        }, o.requestAnimationFrame ? o.requestAnimationFrame(t) : o.setTimeout(t, 0))
      });
      i.observe(e, {
        attributes: void 0 === t.attributes || t.attributes,
        childList: void 0 === t.childList || t.childList,
        characterData: void 0 === t.characterData || t.characterData
      }), r.push(i)
    }
    const r = [],
      o = P();
    t({
      observer: !1,
      observeParents: !1,
      observeSlideChildren: !1
    }), s("init", () => {
      if (i.params.observer) {
        if (i.params.observeParents) {
          var t = i.$el.parents();
          for (let e = 0; e < t.length; e += 1) a(t[e])
        }
        a(i.$el[0], {
          childList: i.params.observeSlideChildren
        }), a(i.$wrapperEl[0], {
          attributes: !1
        })
      }
    }), s("destroy", () => {
      r.forEach(e => {
        e.disconnect()
      }), r.splice(0, r.length)
    })
  }]), E.use([function (e) {
    let t, {
      swiper: x,
      extendParams: i,
      on: s,
      emit: _
    } = e;

    function E(e, t) {
      var i = x.params.virtual;
      return i.cache && x.virtual.cache[t] ? x.virtual.cache[t] : ((e = i.renderSlide ? L(i.renderSlide.call(x, e, t)) : L(`<div class="${x.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`)).attr("data-swiper-slide-index") || e.attr("data-swiper-slide-index", t), i.cache && (x.virtual.cache[t] = e), e)
    }

    function r(t) {
      const {
        slidesPerView: e,
        slidesPerGroup: i,
        centeredSlides: s
      } = x.params, {
        addSlidesBefore: n,
        addSlidesAfter: a
      } = x.params.virtual, {
        from: r,
        to: o,
        slides: l,
        slidesGrid: d,
        offset: c
      } = x.virtual;
      x.params.cssMode || x.updateActiveIndex();
      var h = x.activeIndex || 0;
      let p, u, f;
      p = x.rtlTranslate ? "right" : x.isHorizontal() ? "left" : "top", f = s ? (u = Math.floor(e / 2) + i + a, Math.floor(e / 2) + i + n) : (u = e + (i - 1) + a, i + n);
      const m = Math.max((h || 0) - f, 0),
        g = Math.min((h || 0) + u, l.length - 1),
        v = (x.slidesGrid[m] || 0) - (x.slidesGrid[0] || 0);

      function b() {
        x.updateSlides(), x.updateProgress(), x.updateSlidesClasses(), x.lazy && x.params.lazy.enabled && x.lazy.load(), _("virtualUpdate")
      }
      if (Object.assign(x.virtual, {
          from: m,
          to: g,
          offset: v,
          slidesGrid: x.slidesGrid
        }), r !== m || o !== g || t)
        if (x.params.virtual.renderExternal) x.params.virtual.renderExternal.call(x, {
          offset: v,
          from: m,
          to: g,
          slides: function () {
            var t = [];
            for (let e = m; e <= g; e += 1) t.push(l[e]);
            return t
          }()
        }), x.params.virtual.renderExternalUpdate ? b() : _("virtualUpdate");
        else {
          var y = [],
            w = [];
          if (t) x.$wrapperEl.find("." + x.params.slideClass).remove();
          else
            for (let e = r; e <= o; e += 1)(e < m || e > g) && x.$wrapperEl.find(`.${x.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
          for (let e = 0; e < l.length; e += 1) e >= m && e <= g && (void 0 === o || t ? w.push(e) : (e > o && w.push(e), e < r && y.push(e)));
          w.forEach(e => {
            x.$wrapperEl.append(E(l[e], e))
          }), y.sort((e, t) => t - e).forEach(e => {
            x.$wrapperEl.prepend(E(l[e], e))
          }), x.$wrapperEl.children(".swiper-slide").css(p, v + "px"), b()
        }
      else x.slidesGrid !== d && v !== c && x.slides.css(p, v + "px"), x.updateProgress(), _("virtualUpdate")
    }
    i({
      virtual: {
        enabled: !1,
        slides: [],
        cache: !0,
        renderSlide: null,
        renderExternal: null,
        renderExternalUpdate: !0,
        addSlidesBefore: 0,
        addSlidesAfter: 0
      }
    }), x.virtual = {
      cache: {},
      from: void 0,
      to: void 0,
      slides: [],
      offset: 0,
      slidesGrid: []
    }, s("beforeInit", () => {
      x.params.virtual.enabled && (x.virtual.slides = x.params.virtual.slides, x.classNames.push(x.params.containerModifierClass + "virtual"), x.params.watchSlidesProgress = !0, x.originalParams.watchSlidesProgress = !0, x.params.initialSlide || r())
    }), s("setTranslate", () => {
      x.params.virtual.enabled && (x.params.cssMode && !x._immediateVirtual ? (clearTimeout(t), t = setTimeout(() => {
        r()
      }, 100)) : r())
    }), s("init update resize", () => {
      x.params.virtual.enabled && x.params.cssMode && S(x.wrapperEl, "--swiper-virtual-size", x.virtualSize + "px")
    }), Object.assign(x.virtual, {
      appendSlide: function (t) {
        if ("object" == typeof t && "length" in t)
          for (let e = 0; e < t.length; e += 1) t[e] && x.virtual.slides.push(t[e]);
        else x.virtual.slides.push(t);
        r(!0)
      },
      prependSlide: function (s) {
        const n = x.activeIndex;
        let e = n + 1,
          a = 1;
        if (Array.isArray(s)) {
          for (let e = 0; e < s.length; e += 1) s[e] && x.virtual.slides.unshift(s[e]);
          e = n + s.length, a = s.length
        } else x.virtual.slides.unshift(s);
        if (x.params.virtual.cache) {
          const s = x.virtual.cache,
            n = {};
          Object.keys(s).forEach(e => {
            var t = s[e],
              i = t.attr("data-swiper-slide-index");
            i && t.attr("data-swiper-slide-index", parseInt(i, 10) + a), n[parseInt(e, 10) + a] = t
          }), x.virtual.cache = n
        }
        r(!0), x.slideTo(e, 0)
      },
      removeSlide: function (i) {
        if (null != i) {
          let t = x.activeIndex;
          if (Array.isArray(i))
            for (let e = i.length - 1; 0 <= e; --e) x.virtual.slides.splice(i[e], 1), x.params.virtual.cache && delete x.virtual.cache[i[e]], i[e] < t && --t, t = Math.max(t, 0);
          else x.virtual.slides.splice(i, 1), x.params.virtual.cache && delete x.virtual.cache[i], i < t && --t, t = Math.max(t, 0);
          r(!0), x.slideTo(t, 0)
        }
      },
      removeAllSlides: function () {
        x.virtual.slides = [], x.params.virtual.cache && (x.virtual.cache = {}), r(!0), x.slideTo(0, 0)
      },
      update: r
    })
  }, function (e) {
    let {
      swiper: h,
      extendParams: t,
      on: i,
      emit: p
    } = e;
    const u = T(),
      f = P();

    function s(t) {
      if (h.enabled) {
        const i = h["rtlTranslate"];
        let e = t;
        const s = (e = e.originalEvent ? e.originalEvent : e).keyCode || e.charCode,
          n = h.params.keyboard.pageUpDown,
          a = n && 33 === s,
          r = n && 34 === s,
          o = 37 === s,
          l = 39 === s,
          d = 38 === s,
          c = 40 === s;
        if (!h.allowSlideNext && (h.isHorizontal() && l || h.isVertical() && c || r)) return !1;
        if (!h.allowSlidePrev && (h.isHorizontal() && o || h.isVertical() && d || a)) return !1;
        if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || u.activeElement && u.activeElement.nodeName && ("input" === u.activeElement.nodeName.toLowerCase() || "textarea" === u.activeElement.nodeName.toLowerCase()))) {
          if (h.params.keyboard.onlyInViewport && (a || r || o || l || d || c)) {
            let t = !1;
            if (0 < h.$el.parents("." + h.params.slideClass).length && 0 === h.$el.parents("." + h.params.slideActiveClass).length) return;
            const e = h.$el,
              s = e[0].clientWidth,
              n = e[0].clientHeight,
              p = f.innerWidth,
              u = f.innerHeight,
              a = h.$el.offset(),
              r = (i && (a.left -= h.$el[0].scrollLeft), [
                [a.left, a.top],
                [a.left + s, a.top],
                [a.left, a.top + n],
                [a.left + s, a.top + n]
              ]);
            for (let e = 0; e < r.length; e += 1) {
              const i = r[e];
              0 <= i[0] && i[0] <= p && 0 <= i[1] && i[1] <= u && (0 === i[0] && 0 === i[1] || (t = !0))
            }
            if (!t) return
          }
          h.isHorizontal() ? ((a || r || o || l) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), ((r || l) && !i || (a || o) && i) && h.slideNext(), ((a || o) && !i || (r || l) && i) && h.slidePrev()) : ((a || r || d || c) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (r || c) && h.slideNext(), (a || d) && h.slidePrev()), p("keyPress", s)
        }
      }
    }

    function n() {
      h.keyboard.enabled || (L(u).on("keydown", s), h.keyboard.enabled = !0)
    }

    function a() {
      h.keyboard.enabled && (L(u).off("keydown", s), h.keyboard.enabled = !1)
    }
    h.keyboard = {
      enabled: !1
    }, t({
      keyboard: {
        enabled: !1,
        onlyInViewport: !0,
        pageUpDown: !0
      }
    }), i("init", () => {
      h.params.keyboard.enabled && n()
    }), i("destroy", () => {
      h.keyboard.enabled && a()
    }), Object.assign(h.keyboard, {
      enable: n,
      disable: a
    })
  }, function (e) {
    let {
      swiper: d,
      extendParams: t,
      on: i,
      emit: c
    } = e;
    const s = P();
    let h;
    t({
      mousewheel: {
        enabled: !1,
        releaseOnEdges: !1,
        invert: !1,
        forceToAxis: !1,
        sensitivity: 1,
        eventsTarget: "container",
        thresholdDelta: null,
        thresholdTime: null
      }
    }), d.mousewheel = {
      enabled: !1
    };
    let p, n = v();
    const u = [];

    function a() {
      d.enabled && (d.mouseEntered = !0)
    }

    function r() {
      d.enabled && (d.mouseEntered = !1)
    }

    function f(e) {
      d.params.mousewheel.thresholdDelta && e.delta < d.params.mousewheel.thresholdDelta || d.params.mousewheel.thresholdTime && v() - n < d.params.mousewheel.thresholdTime || 6 <= e.delta && v() - n < 60 || (e.direction < 0 ? d.isEnd && !d.params.loop || d.animating || (d.slideNext(), c("scroll", e.raw)) : d.isBeginning && !d.params.loop || d.animating || (d.slidePrev(), c("scroll", e.raw)), n = (new s.Date).getTime())
    }

    function o(s) {
      let n = s,
        a = !0;
      if (d.enabled) {
        var r = d.params.mousewheel;
        d.params.cssMode && n.preventDefault();
        let e = d.$el;
        if ("container" !== d.params.mousewheel.eventsTarget && (e = L(d.params.mousewheel.eventsTarget)), !d.mouseEntered && !e[0].contains(n.target) && !r.releaseOnEdges) return !0;
        n.originalEvent && (n = n.originalEvent);
        let t = 0;
        var o = d.rtlTranslate ? -1 : 1,
          l = function (e) {
            let t = 0,
              i = 0,
              s = 0,
              n = 0;
            return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, n = 10 * i, "deltaY" in e && (n = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = n, n = 0), (s || n) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, n *= 40) : (s *= 800, n *= 800)), s && !t && (t = s < 1 ? -1 : 1), n && !i && (i = n < 1 ? -1 : 1), {
              spinX: t,
              spinY: i,
              pixelX: s,
              pixelY: n
            }
          }(n);
        if (r.forceToAxis)
          if (d.isHorizontal()) {
            if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
            t = -l.pixelX * o
          } else {
            if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
            t = -l.pixelY
          }
        else t = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * o : -l.pixelY;
        if (0 === t) return !0;
        r.invert && (t = -t);
        let i = d.getTranslate() + t * r.sensitivity;
        if ((i = i >= d.minTranslate() ? d.minTranslate() : i) <= d.maxTranslate() && (i = d.maxTranslate()), (a = !!d.params.loop || !(i === d.minTranslate() || i === d.maxTranslate())) && d.params.nested && n.stopPropagation(), d.params.freeMode && d.params.freeMode.enabled) {
          const s = {
              time: v(),
              delta: Math.abs(t),
              direction: Math.sign(t)
            },
            a = p && s.time < p.time + 500 && s.delta <= p.delta && s.direction === p.direction;
          if (!a) {
            p = void 0, d.params.loop && d.loopFix();
            let e = d.getTranslate() + t * r.sensitivity;
            const L = d.isBeginning,
              v = d.isEnd;
            if ((e = e >= d.minTranslate() ? d.minTranslate() : e) <= d.maxTranslate() && (e = d.maxTranslate()), d.setTransition(0), d.setTranslate(e), d.updateProgress(), d.updateActiveIndex(), d.updateSlidesClasses(), (!L && d.isBeginning || !v && d.isEnd) && d.updateSlidesClasses(), d.params.freeMode.sticky) {
              clearTimeout(h), h = void 0, 15 <= u.length && u.shift();
              const n = u.length ? u[u.length - 1] : void 0,
                a = u[0];
              if (u.push(s), n && (s.delta > n.delta || s.direction !== n.direction)) u.splice(0);
              else if (15 <= u.length && s.time - a.time < 500 && 1 <= a.delta - s.delta && s.delta <= 6) {
                const n = 0 < t ? .8 : .2;
                p = s, u.splice(0), h = C(() => {
                  d.slideToClosest(d.params.speed, !0, void 0, n)
                }, 0)
              }
              h = h || C(() => {
                p = s, u.splice(0), d.slideToClosest(d.params.speed, !0, void 0, .5)
              }, 500)
            }
            if (a || c("scroll", n), d.params.autoplay && d.params.autoplayDisableOnInteraction && d.autoplay.stop(), e === d.minTranslate() || e === d.maxTranslate()) return !0
          }
        } else {
          const n = {
              time: v(),
              delta: Math.abs(t),
              direction: Math.sign(t),
              raw: s
            },
            a = (2 <= u.length && u.shift(), u.length ? u[u.length - 1] : void 0);
          if (u.push(n), (!a || n.direction !== a.direction || n.delta > a.delta || n.time > a.time + 150) && f(n), function (e) {
              var t = d.params.mousewheel;
              if (e.direction < 0) {
                if (d.isEnd && !d.params.loop && t.releaseOnEdges) return 1
              } else if (d.isBeginning && !d.params.loop && t.releaseOnEdges) return 1
            }(n)) return !0
        }
        return n.preventDefault ? n.preventDefault() : n.returnValue = !1, !1
      }
    }

    function l(e) {
      let t = d.$el;
      (t = "container" !== d.params.mousewheel.eventsTarget ? L(d.params.mousewheel.eventsTarget) : t)[e]("mouseenter", a), t[e]("mouseleave", r), t[e]("wheel", o)
    }

    function m() {
      return d.params.cssMode ? (d.wrapperEl.removeEventListener("wheel", o), !0) : !d.mousewheel.enabled && (l("on"), d.mousewheel.enabled = !0)
    }

    function g() {
      return d.params.cssMode ? (d.wrapperEl.addEventListener(event, o), !0) : !!d.mousewheel.enabled && (l("off"), !(d.mousewheel.enabled = !1))
    }
    i("init", () => {
      !d.params.mousewheel.enabled && d.params.cssMode && g(), d.params.mousewheel.enabled && m()
    }), i("destroy", () => {
      d.params.cssMode && m(), d.mousewheel.enabled && g()
    }), Object.assign(d.mousewheel, {
      enable: m,
      disable: g
    })
  }, function (e) {
    let {
      swiper: n,
      extendParams: t,
      on: i,
      emit: a
    } = e;

    function s(e) {
      let t;
      return t = e && (t = L(e), n.params.uniqueNavElements) && "string" == typeof e && 1 < t.length && 1 === n.$el.find(e).length ? n.$el.find(e) : t
    }

    function r(e, t) {
      var i = n.params.navigation;
      e && 0 < e.length && (e[t ? "addClass" : "removeClass"](i.disabledClass), e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = t), n.params.watchOverflow) && n.enabled && e[n.isLocked ? "addClass" : "removeClass"](i.lockClass)
    }

    function o() {
      var e, t;
      n.params.loop || ({
        $nextEl: e,
        $prevEl: t
      } = n.navigation, r(t, n.isBeginning && !n.params.rewind), r(e, n.isEnd && !n.params.rewind))
    }

    function l(e) {
      e.preventDefault(), n.isBeginning && !n.params.loop && !n.params.rewind || (n.slidePrev(), a("navigationPrev"))
    }

    function d(e) {
      e.preventDefault(), n.isEnd && !n.params.loop && !n.params.rewind || (n.slideNext(), a("navigationNext"))
    }

    function c() {
      var e, t, i = n.params.navigation;
      n.params.navigation = M(n, n.originalParams.navigation, n.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      }), (i.nextEl || i.prevEl) && (e = s(i.nextEl), t = s(i.prevEl), e && 0 < e.length && e.on("click", d), t && 0 < t.length && t.on("click", l), Object.assign(n.navigation, {
        $nextEl: e,
        nextEl: e && e[0],
        $prevEl: t,
        prevEl: t && t[0]
      }), n.enabled || (e && e.addClass(i.lockClass), t && t.addClass(i.lockClass)))
    }

    function h() {
      var {
        $nextEl: e,
        $prevEl: t
      } = n.navigation;
      e && e.length && (e.off("click", d), e.removeClass(n.params.navigation.disabledClass)), t && t.length && (t.off("click", l), t.removeClass(n.params.navigation.disabledClass))
    }
    t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    }), n.navigation = {
      nextEl: null,
      $nextEl: null,
      prevEl: null,
      $prevEl: null
    }, i("init", () => {
      (!1 === n.params.navigation.enabled ? p : (c(), o))()
    }), i("toEdge fromEdge lock unlock", () => {
      o()
    }), i("destroy", () => {
      h()
    }), i("enable disable", () => {
      var {
        $nextEl: e,
        $prevEl: t
      } = n.navigation;
      e && e[n.enabled ? "removeClass" : "addClass"](n.params.navigation.lockClass), t && t[n.enabled ? "removeClass" : "addClass"](n.params.navigation.lockClass)
    }), i("click", (e, t) => {
      var {
        $nextEl: i,
        $prevEl: s
      } = n.navigation, t = t.target;
      if (n.params.navigation.hideOnClick && !L(t).is(s) && !L(t).is(i) && (!(n.pagination && n.params.pagination && n.params.pagination.clickable) || n.pagination.el !== t && !n.pagination.el.contains(t))) {
        let e;
        i ? e = i.hasClass(n.params.navigation.hiddenClass) : s && (e = s.hasClass(n.params.navigation.hiddenClass)), a(!0 === e ? "navigationShow" : "navigationHide"), i && i.toggleClass(n.params.navigation.hiddenClass), s && s.toggleClass(n.params.navigation.hiddenClass)
      }
    });
    const p = () => {
      n.$el.addClass(n.params.navigation.navigationDisabledClass), h()
    };
    Object.assign(n.navigation, {
      enable: () => {
        n.$el.removeClass(n.params.navigation.navigationDisabledClass), c(), o()
      },
      disable: p,
      update: o,
      init: c,
      destroy: h
    })
  }, function (e) {
    let {
      swiper: l,
      extendParams: t,
      on: i,
      emit: d
    } = e;
    e = "swiper-pagination";
    let c, h = (t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: e => e,
        formatFractionTotal: e => e,
        bulletClass: e + "-bullet",
        bulletActiveClass: e + "-bullet-active",
        modifierClass: e + "-",
        currentClass: e + "-current",
        totalClass: e + "-total",
        hiddenClass: e + "-hidden",
        progressbarFillClass: e + "-progressbar-fill",
        progressbarOppositeClass: e + "-progressbar-opposite",
        clickableClass: e + "-clickable",
        lockClass: e + "-lock",
        horizontalClass: e + "-horizontal",
        verticalClass: e + "-vertical",
        paginationDisabledClass: e + "-disabled"
      }
    }), l.pagination = {
      el: null,
      $el: null,
      bullets: []
    }, 0);

    function p() {
      return !l.params.pagination.el || !l.pagination.el || !l.pagination.$el || 0 === l.pagination.$el.length
    }

    function u(e, t) {
      var i = l.params.pagination["bulletActiveClass"];
      e[t]().addClass(i + "-" + t)[t]().addClass(i + `-${t}-` + t)
    }

    function s() {
      const t = l.rtl,
        a = l.params.pagination;
      if (!p()) {
        const r = (l.virtual && l.params.virtual.enabled ? l.virtual : l).slides.length,
          o = l.pagination.$el;
        let n;
        var i = l.params.loop ? Math.ceil((r - 2 * l.loopedSlides) / l.params.slidesPerGroup) : l.snapGrid.length;
        if (l.params.loop ? ((n = Math.ceil((l.activeIndex - l.loopedSlides) / l.params.slidesPerGroup)) > r - 1 - 2 * l.loopedSlides && (n -= r - 2 * l.loopedSlides), n > i - 1 && (n -= i), n < 0 && "bullets" !== l.params.paginationType && (n = i + n)) : n = void 0 !== l.snapIndex ? l.snapIndex : l.activeIndex || 0, "bullets" === a.type && l.pagination.bullets && 0 < l.pagination.bullets.length) {
          const r = l.pagination.bullets;
          let i, s, e;
          if (a.dynamicBullets && (c = r.eq(0)[l.isHorizontal() ? "outerWidth" : "outerHeight"](!0), o.css(l.isHorizontal() ? "width" : "height", c * (a.dynamicMainBullets + 4) + "px"), 1 < a.dynamicMainBullets && void 0 !== l.previousIndex && ((h += n - (l.previousIndex - l.loopedSlides || 0)) > a.dynamicMainBullets - 1 ? h = a.dynamicMainBullets - 1 : h < 0 && (h = 0)), i = Math.max(n - h, 0), s = i + (Math.min(r.length, a.dynamicMainBullets) - 1), e = (s + i) / 2), r.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => "" + a.bulletActiveClass + e).join(" ")), 1 < o.length) r.each(e => {
            var e = L(e),
              t = e.index();
            t === n && e.addClass(a.bulletActiveClass), a.dynamicBullets && (t >= i && t <= s && e.addClass(a.bulletActiveClass + "-main"), t === i && u(e, "prev"), t === s) && u(e, "next")
          });
          else {
            const t = r.eq(n),
              o = t.index();
            if (t.addClass(a.bulletActiveClass), a.dynamicBullets) {
              const t = r.eq(i),
                c = r.eq(s);
              for (let e = i; e <= s; e += 1) r.eq(e).addClass(a.bulletActiveClass + "-main");
              if (l.params.loop)
                if (o >= r.length) {
                  for (let e = a.dynamicMainBullets; 0 <= e; --e) r.eq(r.length - e).addClass(a.bulletActiveClass + "-main");
                  r.eq(r.length - a.dynamicMainBullets - 1).addClass(a.bulletActiveClass + "-prev")
                } else u(t, "prev"), u(c, "next");
              else u(t, "prev"), u(c, "next")
            }
          }
          if (a.dynamicBullets) {
            const d = Math.min(r.length, a.dynamicMainBullets + 4),
              o = (c * d - c) / 2 - e * c,
              h = t ? "right" : "left";
            r.css(l.isHorizontal() ? h : "top", o + "px")
          }
        }
        if ("fraction" === a.type && (o.find(k(a.currentClass)).text(a.formatFractionCurrent(n + 1)), o.find(k(a.totalClass)).text(a.formatFractionTotal(i))), "progressbar" === a.type) {
          var s = a.progressbarOpposite ? l.isHorizontal() ? "vertical" : "horizontal" : l.isHorizontal() ? "horizontal" : "vertical";
          const r = (n + 1) / i;
          let e = 1,
            t = 1;
          "horizontal" == s ? e = r : t = r, o.find(k(a.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${e}) scaleY(${t})`).transition(l.params.speed)
        }
        "custom" === a.type && a.renderCustom ? (o.html(a.renderCustom(l, n + 1, i)), d("paginationRender", o[0])) : d("paginationUpdate", o[0]), l.params.watchOverflow && l.enabled && o[l.isLocked ? "addClass" : "removeClass"](a.lockClass)
      }
    }

    function n() {
      var s = l.params.pagination;
      if (!p()) {
        var e = (l.virtual && l.params.virtual.enabled ? l.virtual : l).slides.length,
          n = l.pagination.$el;
        let i = "";
        if ("bullets" === s.type) {
          let t = l.params.loop ? Math.ceil((e - 2 * l.loopedSlides) / l.params.slidesPerGroup) : l.snapGrid.length;
          l.params.freeMode && l.params.freeMode.enabled && !l.params.loop && t > e && (t = e);
          for (let e = 0; e < t; e += 1) s.renderBullet ? i += s.renderBullet.call(l, e, s.bulletClass) : i += `<${s.bulletElement} class="${s.bulletClass}"></${s.bulletElement}>`;
          n.html(i), l.pagination.bullets = n.find(k(s.bulletClass))
        }
        "fraction" === s.type && (i = s.renderFraction ? s.renderFraction.call(l, s.currentClass, s.totalClass) : `<span class="${s.currentClass}"></span> / <span class="${s.totalClass}"></span>`, n.html(i)), "progressbar" === s.type && (i = s.renderProgressbar ? s.renderProgressbar.call(l, s.progressbarFillClass) : `<span class="${s.progressbarFillClass}"></span>`, n.html(i)), "custom" !== s.type && d("paginationRender", l.pagination.$el[0])
      }
    }

    function a() {
      l.params.pagination = M(l, l.originalParams.pagination, l.params.pagination, {
        el: "swiper-pagination"
      });
      var t = l.params.pagination;
      if (t.el) {
        let e = L(t.el);
        0 !== e.length && (l.params.uniqueNavElements && "string" == typeof t.el && 1 < e.length && 1 < (e = l.$el.find(t.el)).length && (e = e.filter(e => L(e).parents(".swiper")[0] === l.el)), "bullets" === t.type && t.clickable && e.addClass(t.clickableClass), e.addClass(t.modifierClass + t.type), e.addClass(l.isHorizontal() ? t.horizontalClass : t.verticalClass), "bullets" === t.type && t.dynamicBullets && (e.addClass("" + t.modifierClass + t.type + "-dynamic"), h = 0, t.dynamicMainBullets < 1) && (t.dynamicMainBullets = 1), "progressbar" === t.type && t.progressbarOpposite && e.addClass(t.progressbarOppositeClass), t.clickable && e.on("click", k(t.bulletClass), function (e) {
          e.preventDefault();
          let t = L(this).index() * l.params.slidesPerGroup;
          l.params.loop && (t += l.loopedSlides), l.slideTo(t)
        }), Object.assign(l.pagination, {
          $el: e,
          el: e[0]
        }), l.enabled || e.addClass(t.lockClass))
      }
    }

    function r() {
      var e, t = l.params.pagination;
      p() || ((e = l.pagination.$el).removeClass(t.hiddenClass), e.removeClass(t.modifierClass + t.type), e.removeClass(l.isHorizontal() ? t.horizontalClass : t.verticalClass), l.pagination.bullets && l.pagination.bullets.removeClass && l.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && e.off("click", k(t.bulletClass)))
    }
    i("init", () => {
      (!1 === l.params.pagination.enabled ? o : (a(), n(), s))()
    }), i("activeIndexChange", () => {
      !l.params.loop && void 0 !== l.snapIndex || s()
    }), i("snapIndexChange", () => {
      l.params.loop || s()
    }), i("slidesLengthChange", () => {
      l.params.loop && (n(), s())
    }), i("snapGridLengthChange", () => {
      l.params.loop || (n(), s())
    }), i("destroy", () => {
      r()
    }), i("enable disable", () => {
      var e = l.pagination["$el"];
      e && e[l.enabled ? "removeClass" : "addClass"](l.params.pagination.lockClass)
    }), i("lock unlock", () => {
      s()
    }), i("click", (e, t) => {
      var t = t.target,
        i = l.pagination["$el"];
      if (l.params.pagination.el && l.params.pagination.hideOnClick && i && 0 < i.length && !L(t).hasClass(l.params.pagination.bulletClass) && (!l.navigation || !(l.navigation.nextEl && t === l.navigation.nextEl || l.navigation.prevEl && t === l.navigation.prevEl))) {
        const e = i.hasClass(l.params.pagination.hiddenClass);
        d(!0 === e ? "paginationShow" : "paginationHide"), i.toggleClass(l.params.pagination.hiddenClass)
      }
    });
    const o = () => {
      l.$el.addClass(l.params.pagination.paginationDisabledClass), l.pagination.$el && l.pagination.$el.addClass(l.params.pagination.paginationDisabledClass), r()
    };
    Object.assign(l.pagination, {
      enable: () => {
        l.$el.removeClass(l.params.pagination.paginationDisabledClass), l.pagination.$el && l.pagination.$el.removeClass(l.params.pagination.paginationDisabledClass), a(), n(), s()
      },
      disable: o,
      render: n,
      update: s,
      init: a,
      destroy: r
    })
  }, function (e) {
    let {
      swiper: l,
      extendParams: t,
      on: i,
      emit: a
    } = e;
    const o = T();
    let r, d, c, s, h = !1,
      p = null,
      u = null;

    function n() {
      if (l.params.scrollbar.el && l.scrollbar.el) {
        const {
          scrollbar: i,
          rtlTranslate: s,
          progress: n
        } = l, {
          $dragEl: a,
          $el: r
        } = i, o = l.params.scrollbar;
        let e = d,
          t = (c - d) * n;
        s ? 0 < (t = -t) ? (e = d - t, t = 0) : -t + d > c && (e = c + t) : t < 0 ? (e = d + t, t = 0) : t + d > c && (e = c - t), l.isHorizontal() ? (a.transform(`translate3d(${t}px, 0, 0)`), a[0].style.width = e + "px") : (a.transform(`translate3d(0px, ${t}px, 0)`), a[0].style.height = e + "px"), o.hide && (clearTimeout(p), r[0].style.opacity = 1, p = setTimeout(() => {
          r[0].style.opacity = 0, r.transition(400)
        }, 1e3))
      }
    }

    function f() {
      var e, t, i;
      l.params.scrollbar.el && l.scrollbar.el && (e = l["scrollbar"], {
        $dragEl: t,
        $el: i
      } = e, t[0].style.width = "", t[0].style.height = "", c = l.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, s = l.size / (l.virtualSize + l.params.slidesOffsetBefore - (l.params.centeredSlides ? l.snapGrid[0] : 0)), d = "auto" === l.params.scrollbar.dragSize ? c * s : parseInt(l.params.scrollbar.dragSize, 10), l.isHorizontal() ? t[0].style.width = d + "px" : t[0].style.height = d + "px", i[0].style.display = 1 <= s ? "none" : "", l.params.scrollbar.hide && (i[0].style.opacity = 0), l.params.watchOverflow) && l.enabled && e.$el[l.isLocked ? "addClass" : "removeClass"](l.params.scrollbar.lockClass)
    }

    function m(e) {
      return l.isHorizontal() ? ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0] : e).clientX : ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0] : e).clientY
    }

    function g(e) {
      var {
        scrollbar: t,
        rtlTranslate: i
      } = l, t = t["$el"];
      let s;
      s = (m(e) - t.offset()[l.isHorizontal() ? "left" : "top"] - (null !== r ? r : d / 2)) / (c - d), s = Math.max(Math.min(s, 1), 0), i && (s = 1 - s);
      e = l.minTranslate() + (l.maxTranslate() - l.minTranslate()) * s;
      l.updateProgress(e), l.setTranslate(e), l.updateActiveIndex(), l.updateSlidesClasses()
    }

    function v(e) {
      var t = l.params.scrollbar,
        {
          scrollbar: i,
          $wrapperEl: s
        } = l,
        {
          $el: i,
          $dragEl: n
        } = i;
      h = !0, r = e.target === n[0] || e.target === n ? m(e) - e.target.getBoundingClientRect()[l.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), g(e), clearTimeout(u), i.transition(0), t.hide && i.css("opacity", 1), l.params.cssMode && l.$wrapperEl.css("scroll-snap-type", "none"), a("scrollbarDragStart", e)
    }

    function b(e) {
      var {
        scrollbar: t,
        $wrapperEl: i
      } = l, {
        $el: t,
        $dragEl: s
      } = t;
      h && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, g(e), i.transition(0), t.transition(0), s.transition(0), a("scrollbarDragMove", e))
    }

    function y(e) {
      const t = l.params.scrollbar,
        {
          scrollbar: i,
          $wrapperEl: s
        } = l,
        n = i["$el"];
      h && (h = !1, l.params.cssMode && (l.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), t.hide && (clearTimeout(u), u = C(() => {
        n.css("opacity", 0), n.transition(400)
      }, 1e3)), a("scrollbarDragEnd", e), t.snapOnRelease) && l.slideToClosest()
    }

    function w(e) {
      var t, {
          scrollbar: i,
          touchEventsTouch: s,
          touchEventsDesktop: n,
          params: a,
          support: r
        } = l,
        i = i.$el;
      i && (i = i[0], t = !(!r.passiveListener || !a.passiveListeners) && {
        passive: !1,
        capture: !1
      }, a = !(!r.passiveListener || !a.passiveListeners) && {
        passive: !0,
        capture: !1
      }, i) && (e = "on" === e ? "addEventListener" : "removeEventListener", r.touch ? (i[e](s.start, v, t), i[e](s.move, b, t), i[e](s.end, y, a)) : (i[e](n.start, v, t), o[e](n.move, b, t), o[e](n.end, y, a)))
    }

    function x() {
      var {
        scrollbar: i,
        $el: s
      } = l, n = (l.params.scrollbar = M(l, l.originalParams.scrollbar, l.params.scrollbar, {
        el: "swiper-scrollbar"
      }), l.params.scrollbar);
      if (n.el) {
        let e = L(n.el),
          t = ((e = l.params.uniqueNavElements && "string" == typeof n.el && 1 < e.length && 1 === s.find(n.el).length ? s.find(n.el) : e).addClass(l.isHorizontal() ? n.horizontalClass : n.verticalClass), e.find("." + l.params.scrollbar.dragClass));
        0 === t.length && (t = L(`<div class="${l.params.scrollbar.dragClass}"></div>`), e.append(t)), Object.assign(i, {
          $el: e,
          el: e[0],
          $dragEl: t,
          dragEl: t[0]
        }), n.draggable && l.params.scrollbar.el && l.scrollbar.el && w("on"), e && e[l.enabled ? "removeClass" : "addClass"](l.params.scrollbar.lockClass)
      }
    }

    function _() {
      var e = l.params.scrollbar,
        t = l.scrollbar.$el;
      t && t.removeClass(l.isHorizontal() ? e.horizontalClass : e.verticalClass), l.params.scrollbar.el && l.scrollbar.el && w("off")
    }
    t({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: !1,
        draggable: !1,
        snapOnRelease: !0,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
        scrollbarDisabledClass: "swiper-scrollbar-disabled",
        horizontalClass: "swiper-scrollbar-horizontal",
        verticalClass: "swiper-scrollbar-vertical"
      }
    }), l.scrollbar = {
      el: null,
      dragEl: null,
      $el: null,
      $dragEl: null
    }, i("init", () => {
      (!1 === l.params.scrollbar.enabled ? E : (x(), f(), n))()
    }), i("update resize observerUpdate lock unlock", () => {
      f()
    }), i("setTranslate", () => {
      n()
    }), i("setTransition", (e, t) => {
      t = t, l.params.scrollbar.el && l.scrollbar.el && l.scrollbar.$dragEl.transition(t)
    }), i("enable disable", () => {
      var e = l.scrollbar["$el"];
      e && e[l.enabled ? "removeClass" : "addClass"](l.params.scrollbar.lockClass)
    }), i("destroy", () => {
      _()
    });
    const E = () => {
      l.$el.addClass(l.params.scrollbar.scrollbarDisabledClass), l.scrollbar.$el && l.scrollbar.$el.addClass(l.params.scrollbar.scrollbarDisabledClass), _()
    };
    Object.assign(l.scrollbar, {
      enable: () => {
        l.$el.removeClass(l.params.scrollbar.scrollbarDisabledClass), l.scrollbar.$el && l.scrollbar.$el.removeClass(l.params.scrollbar.scrollbarDisabledClass), x(), f(), n()
      },
      disable: E,
      updateSize: f,
      setTranslate: n,
      init: x,
      destroy: _
    })
  }, function (e) {
    let {
      swiper: l,
      extendParams: t,
      on: i
    } = e;
    t({
      parallax: {
        enabled: !1
      }
    });
    const a = (e, t) => {
        var i = l["rtl"],
          s = L(e),
          e = i ? -1 : 1,
          i = s.attr("data-swiper-parallax") || "0";
        let n = s.attr("data-swiper-parallax-x"),
          a = s.attr("data-swiper-parallax-y");
        var r = s.attr("data-swiper-parallax-scale"),
          o = s.attr("data-swiper-parallax-opacity");
        if (n || a ? (n = n || "0", a = a || "0") : l.isHorizontal() ? (n = i, a = "0") : (a = i, n = "0"), n = 0 <= n.indexOf("%") ? parseInt(n, 10) * t * e + "%" : n * t * e + "px", a = 0 <= a.indexOf("%") ? parseInt(a, 10) * t + "%" : a * t + "px", null != o) {
          const e = o - (o - 1) * (1 - Math.abs(t));
          s[0].style.opacity = e
        }
        if (null == r) s.transform(`translate3d(${n}, ${a}, 0px)`);
        else {
          const e = r - (r - 1) * (1 - Math.abs(t));
          s.transform(`translate3d(${n}, ${a}, 0px) scale(${e})`)
        }
      },
      s = () => {
        const {
          $el: e,
          slides: t,
          progress: s,
          snapGrid: n
        } = l;
        e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
          a(e, s)
        }), t.each((e, t) => {
          let i = e.progress;
          1 < l.params.slidesPerGroup && "auto" !== l.params.slidesPerView && (i += Math.ceil(t / 2) - s * (n.length - 1)), i = Math.min(Math.max(i, -1), 1), L(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
            a(e, i)
          })
        })
      };
    i("beforeInit", () => {
      l.params.parallax.enabled && (l.params.watchSlidesProgress = !0, l.originalParams.watchSlidesProgress = !0)
    }), i("init", () => {
      l.params.parallax.enabled && s()
    }), i("setTranslate", () => {
      l.params.parallax.enabled && s()
    }), i("setTransition", (e, t) => {
      var i;
      l.params.parallax.enabled && (void 0 === (i = t) && (i = l.params.speed), l.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
        e = L(e);
        let t = parseInt(e.attr("data-swiper-parallax-duration"), 10) || i;
        0 === i && (t = 0), e.transition(t)
      }))
    })
  }, function (e) {
    let {
      swiper: x,
      extendParams: t,
      on: i,
      emit: s
    } = e;
    const _ = P();
    t({
      zoom: {
        enabled: !1,
        maxRatio: 3,
        minRatio: 1,
        toggle: !0,
        containerClass: "swiper-zoom-container",
        zoomedSlideClass: "swiper-slide-zoomed"
      }
    }), x.zoom = {
      enabled: !1
    };
    let n, a, r, E = 1,
      o = !1;
    const T = {
        $slideEl: void 0,
        slideWidth: void 0,
        slideHeight: void 0,
        $imageEl: void 0,
        $imageWrapEl: void 0,
        maxRatio: 3
      },
      C = {
        isTouched: void 0,
        isMoved: void 0,
        currentX: void 0,
        currentY: void 0,
        minX: void 0,
        minY: void 0,
        maxX: void 0,
        maxY: void 0,
        width: void 0,
        height: void 0,
        startX: void 0,
        startY: void 0,
        touchesStart: {},
        touchesCurrent: {}
      },
      l = {
        x: void 0,
        y: void 0,
        prevPositionX: void 0,
        prevPositionY: void 0,
        prevTime: void 0
      };
    let d = 1;

    function c(e) {
      var t, i, s;
      return e.targetTouches.length < 2 ? 1 : (t = e.targetTouches[0].pageX, i = e.targetTouches[0].pageY, s = e.targetTouches[1].pageX, e = e.targetTouches[1].pageY, Math.sqrt((s - t) ** 2 + (e - i) ** 2))
    }

    function h(e) {
      var t = x.support,
        i = x.params.zoom;
      if (a = !1, r = !1, !t.gestures) {
        if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
        a = !0, T.scaleStart = c(e)
      }
      T.$slideEl && T.$slideEl.length || (T.$slideEl = L(e.target).closest("." + x.params.slideClass), 0 === T.$slideEl.length && (T.$slideEl = x.slides.eq(x.activeIndex)), T.$imageEl = T.$slideEl.find("." + i.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), T.$imageWrapEl = T.$imageEl.parent("." + i.containerClass), T.maxRatio = T.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== T.$imageWrapEl.length) ? (T.$imageEl && T.$imageEl.transition(0), o = !0) : T.$imageEl = void 0
    }

    function p(e) {
      var t = x.support,
        i = x.params.zoom,
        s = x.zoom;
      if (!t.gestures) {
        if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
        r = !0, T.scaleMove = c(e)
      }
      T.$imageEl && 0 !== T.$imageEl.length ? (t.gestures ? s.scale = e.scale * E : s.scale = T.scaleMove / T.scaleStart * E, s.scale > T.maxRatio && (s.scale = T.maxRatio - 1 + (s.scale - T.maxRatio + 1) ** .5), s.scale < i.minRatio && (s.scale = i.minRatio + 1 - (i.minRatio - s.scale + 1) ** .5), T.$imageEl.transform(`translate3d(0,0,0) scale(${s.scale})`)) : "gesturechange" === e.type && h(e)
    }

    function u(e) {
      var t = x.device,
        i = x.support,
        s = x.params.zoom,
        n = x.zoom;
      if (!i.gestures) {
        if (!a || !r) return;
        if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !t.android) return;
        a = !1, r = !1
      }
      T.$imageEl && 0 !== T.$imageEl.length && (n.scale = Math.max(Math.min(n.scale, T.maxRatio), s.minRatio), T.$imageEl.transition(x.params.speed).transform(`translate3d(0,0,0) scale(${n.scale})`), E = n.scale, o = !1, 1 === n.scale) && (T.$slideEl = void 0)
    }

    function f(e) {
      var t = x.zoom;
      if (T.$imageEl && 0 !== T.$imageEl.length && (x.allowClick = !1, C.isTouched) && T.$slideEl) {
        C.isMoved || (C.width = T.$imageEl[0].offsetWidth, C.height = T.$imageEl[0].offsetHeight, C.startX = $(T.$imageWrapEl[0], "x") || 0, C.startY = $(T.$imageWrapEl[0], "y") || 0, T.slideWidth = T.$slideEl[0].offsetWidth, T.slideHeight = T.$slideEl[0].offsetHeight, T.$imageWrapEl.transition(0));
        var i = C.width * t.scale,
          t = C.height * t.scale;
        if (!(i < T.slideWidth && t < T.slideHeight)) {
          if (C.minX = Math.min(T.slideWidth / 2 - i / 2, 0), C.maxX = -C.minX, C.minY = Math.min(T.slideHeight / 2 - t / 2, 0), C.maxY = -C.minY, C.touchesCurrent.x = ("touchmove" === e.type ? e.targetTouches[0] : e).pageX, C.touchesCurrent.y = ("touchmove" === e.type ? e.targetTouches[0] : e).pageY, !C.isMoved && !o) {
            if (x.isHorizontal() && (Math.floor(C.minX) === Math.floor(C.startX) && C.touchesCurrent.x < C.touchesStart.x || Math.floor(C.maxX) === Math.floor(C.startX) && C.touchesCurrent.x > C.touchesStart.x)) return void(C.isTouched = !1);
            if (!x.isHorizontal() && (Math.floor(C.minY) === Math.floor(C.startY) && C.touchesCurrent.y < C.touchesStart.y || Math.floor(C.maxY) === Math.floor(C.startY) && C.touchesCurrent.y > C.touchesStart.y)) return void(C.isTouched = !1)
          }
          e.cancelable && e.preventDefault(), e.stopPropagation(), C.isMoved = !0, C.currentX = C.touchesCurrent.x - C.touchesStart.x + C.startX, C.currentY = C.touchesCurrent.y - C.touchesStart.y + C.startY, C.currentX < C.minX && (C.currentX = C.minX + 1 - (C.minX - C.currentX + 1) ** .8), C.currentX > C.maxX && (C.currentX = C.maxX - 1 + (C.currentX - C.maxX + 1) ** .8), C.currentY < C.minY && (C.currentY = C.minY + 1 - (C.minY - C.currentY + 1) ** .8), C.currentY > C.maxY && (C.currentY = C.maxY - 1 + (C.currentY - C.maxY + 1) ** .8), l.prevPositionX || (l.prevPositionX = C.touchesCurrent.x), l.prevPositionY || (l.prevPositionY = C.touchesCurrent.y), l.prevTime || (l.prevTime = Date.now()), l.x = (C.touchesCurrent.x - l.prevPositionX) / (Date.now() - l.prevTime) / 2, l.y = (C.touchesCurrent.y - l.prevPositionY) / (Date.now() - l.prevTime) / 2, Math.abs(C.touchesCurrent.x - l.prevPositionX) < 2 && (l.x = 0), Math.abs(C.touchesCurrent.y - l.prevPositionY) < 2 && (l.y = 0), l.prevPositionX = C.touchesCurrent.x, l.prevPositionY = C.touchesCurrent.y, l.prevTime = Date.now(), T.$imageWrapEl.transform(`translate3d(${C.currentX}px, ${C.currentY}px,0)`)
        }
      }
    }

    function m() {
      var e = x.zoom;
      T.$slideEl && x.previousIndex !== x.activeIndex && (T.$imageEl && T.$imageEl.transform("translate3d(0,0,0) scale(1)"), T.$imageWrapEl && T.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, E = 1, T.$slideEl = void 0, T.$imageEl = void 0, T.$imageWrapEl = void 0)
    }

    function g(b) {
      var y = x.zoom,
        w = x.params.zoom;
      if (T.$slideEl || (b && b.target && (T.$slideEl = L(b.target).closest("." + x.params.slideClass)), T.$slideEl || (x.params.virtual && x.params.virtual.enabled && x.virtual ? T.$slideEl = x.$wrapperEl.children("." + x.params.slideActiveClass) : T.$slideEl = x.slides.eq(x.activeIndex)), T.$imageEl = T.$slideEl.find("." + w.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), T.$imageWrapEl = T.$imageEl.parent("." + w.containerClass)), T.$imageEl && 0 !== T.$imageEl.length && T.$imageWrapEl && 0 !== T.$imageWrapEl.length) {
        let e, t, i, s, n, a, r, o, l, d, c, h, p, u, f, m, g, v;
        x.params.cssMode && (x.wrapperEl.style.overflow = "hidden", x.wrapperEl.style.touchAction = "none"), T.$slideEl.addClass("" + w.zoomedSlideClass), t = void 0 === C.touchesStart.x && b ? (e = ("touchend" === b.type ? b.changedTouches[0] : b).pageX, ("touchend" === b.type ? b.changedTouches[0] : b).pageY) : (e = C.touchesStart.x, C.touchesStart.y), y.scale = T.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, E = T.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b ? (g = T.$slideEl[0].offsetWidth, v = T.$slideEl[0].offsetHeight, i = T.$slideEl.offset().left + _.scrollX, s = T.$slideEl.offset().top + _.scrollY, n = i + g / 2 - e, a = s + v / 2 - t, l = T.$imageEl[0].offsetWidth, d = T.$imageEl[0].offsetHeight, c = l * y.scale, h = d * y.scale, f = -(p = Math.min(g / 2 - c / 2, 0)), m = -(u = Math.min(v / 2 - h / 2, 0)), r = n * y.scale, o = a * y.scale, (r = r < p ? p : r) > f && (r = f), (o = o < u ? u : o) > m && (o = m)) : (r = 0, o = 0), T.$imageWrapEl.transition(300).transform(`translate3d(${r}px, ${o}px,0)`), T.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${y.scale})`)
      }
    }

    function v() {
      var e = x.zoom,
        t = x.params.zoom;
      T.$slideEl || (x.params.virtual && x.params.virtual.enabled && x.virtual ? T.$slideEl = x.$wrapperEl.children("." + x.params.slideActiveClass) : T.$slideEl = x.slides.eq(x.activeIndex), T.$imageEl = T.$slideEl.find("." + t.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), T.$imageWrapEl = T.$imageEl.parent("." + t.containerClass)), T.$imageEl && 0 !== T.$imageEl.length && T.$imageWrapEl && 0 !== T.$imageWrapEl.length && (x.params.cssMode && (x.wrapperEl.style.overflow = "", x.wrapperEl.style.touchAction = ""), e.scale = 1, E = 1, T.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), T.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), T.$slideEl.removeClass("" + t.zoomedSlideClass), T.$slideEl = void 0)
    }

    function b(e) {
      var t = x.zoom;
      t.scale && 1 !== t.scale ? v() : g(e)
    }

    function y() {
      var e = x.support;
      return {
        passiveListener: !("touchstart" !== x.touchEvents.start || !e.passiveListener || !x.params.passiveListeners) && {
          passive: !0,
          capture: !1
        },
        activeListenerWithCapture: !e.passiveListener || {
          passive: !1,
          capture: !0
        }
      }
    }

    function w() {
      return "." + x.params.slideClass
    }

    function S(e) {
      var t = y()["passiveListener"],
        i = w();
      x.$wrapperEl[e]("gesturestart", i, h, t), x.$wrapperEl[e]("gesturechange", i, p, t), x.$wrapperEl[e]("gestureend", i, u, t)
    }

    function M() {
      n || (n = !0, S("on"))
    }

    function k() {
      n && (n = !1, S("off"))
    }

    function A() {
      var e, t, i, s = x.zoom;
      s.enabled || (s.enabled = !0, s = x.support, {
        passiveListener: e,
        activeListenerWithCapture: t
      } = y(), i = w(), s.gestures ? (x.$wrapperEl.on(x.touchEvents.start, M, e), x.$wrapperEl.on(x.touchEvents.end, k, e)) : "touchstart" === x.touchEvents.start && (x.$wrapperEl.on(x.touchEvents.start, i, h, e), x.$wrapperEl.on(x.touchEvents.move, i, p, t), x.$wrapperEl.on(x.touchEvents.end, i, u, e), x.touchEvents.cancel) && x.$wrapperEl.on(x.touchEvents.cancel, i, u, e), x.$wrapperEl.on(x.touchEvents.move, "." + x.params.zoom.containerClass, f, t))
    }

    function O() {
      var e, t, i, s = x.zoom;
      s.enabled && (e = x.support, {
        passiveListener: s,
        activeListenerWithCapture: t
      } = (s.enabled = !1, y()), i = w(), e.gestures ? (x.$wrapperEl.off(x.touchEvents.start, M, s), x.$wrapperEl.off(x.touchEvents.end, k, s)) : "touchstart" === x.touchEvents.start && (x.$wrapperEl.off(x.touchEvents.start, i, h, s), x.$wrapperEl.off(x.touchEvents.move, i, p, t), x.$wrapperEl.off(x.touchEvents.end, i, u, s), x.touchEvents.cancel) && x.$wrapperEl.off(x.touchEvents.cancel, i, u, s), x.$wrapperEl.off(x.touchEvents.move, "." + x.params.zoom.containerClass, f, t))
    }
    Object.defineProperty(x.zoom, "scale", {
      get: () => d,
      set(e) {
        var t, i;
        d !== e && (t = T.$imageEl ? T.$imageEl[0] : void 0, i = T.$slideEl ? T.$slideEl[0] : void 0, s("zoomChange", e, t, i)), d = e
      }
    }), i("init", () => {
      x.params.zoom.enabled && A()
    }), i("destroy", () => {
      O()
    }), i("touchStart", (e, t) => {
      var i;
      x.zoom.enabled && (t = t, i = x.device, T.$imageEl) && 0 !== T.$imageEl.length && !C.isTouched && (i.android && t.cancelable && t.preventDefault(), C.isTouched = !0, C.touchesStart.x = ("touchstart" === t.type ? t.targetTouches[0] : t).pageX, C.touchesStart.y = ("touchstart" === t.type ? t.targetTouches[0] : t).pageY)
    }), i("touchEnd", (e, t) => {
      if (x.zoom.enabled) {
        var i = x.zoom;
        if (T.$imageEl && 0 !== T.$imageEl.length) {
          if (!C.isTouched || !C.isMoved) return void(C.isTouched = !1, C.isMoved = !1);
          C.isTouched = !1, C.isMoved = !1;
          let e = 300,
            t = 300;
          var s = l.x * e,
            s = C.currentX + s,
            n = l.y * t,
            n = C.currentY + n,
            a = (0 !== l.x && (e = Math.abs((s - C.currentX) / l.x)), 0 !== l.y && (t = Math.abs((n - C.currentY) / l.y)), Math.max(e, t)),
            s = (C.currentX = s, C.currentY = n, C.width * i.scale),
            n = C.height * i.scale;
          C.minX = Math.min(T.slideWidth / 2 - s / 2, 0), C.maxX = -C.minX, C.minY = Math.min(T.slideHeight / 2 - n / 2, 0), C.maxY = -C.minY, C.currentX = Math.max(Math.min(C.currentX, C.maxX), C.minX), C.currentY = Math.max(Math.min(C.currentY, C.maxY), C.minY), T.$imageWrapEl.transition(a).transform(`translate3d(${C.currentX}px, ${C.currentY}px,0)`)
        }
      }
    }), i("doubleTap", (e, t) => {
      !x.animating && x.params.zoom.enabled && x.zoom.enabled && x.params.zoom.toggle && b(t)
    }), i("transitionEnd", () => {
      x.zoom.enabled && x.params.zoom.enabled && m()
    }), i("slideChange", () => {
      x.zoom.enabled && x.params.zoom.enabled && x.params.cssMode && m()
    }), Object.assign(x.zoom, {
      enable: A,
      disable: O,
      in: g,
      out: v,
      toggle: b
    })
  }, function (e) {
    let {
      swiper: c,
      extendParams: t,
      on: i,
      emit: h
    } = e, o = (t({
      lazy: {
        checkInView: !1,
        enabled: !1,
        loadPrevNext: !1,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: !1,
        scrollingElement: "",
        elementClass: "swiper-lazy",
        loadingClass: "swiper-lazy-loading",
        loadedClass: "swiper-lazy-loaded",
        preloaderClass: "swiper-lazy-preloader"
      }
    }), !(c.lazy = {})), d = !1;

    function p(e, o) {
      void 0 === o && (o = !0);
      const l = c.params.lazy;
      if (void 0 !== e && 0 !== c.slides.length) {
        const d = c.virtual && c.params.virtual.enabled ? c.$wrapperEl.children(`.${c.params.slideClass}[data-swiper-slide-index="${e}"]`) : c.slides.eq(e),
          t = d.find(`.${l.elementClass}:not(.${l.loadedClass}):not(.${l.loadingClass})`);
        !d.hasClass(l.elementClass) || d.hasClass(l.loadedClass) || d.hasClass(l.loadingClass) || t.push(d[0]), 0 !== t.length && t.each(e => {
          const t = L(e),
            i = (t.addClass(l.loadingClass), t.attr("data-background")),
            s = t.attr("data-src"),
            n = t.attr("data-srcset"),
            a = t.attr("data-sizes"),
            r = t.parent("picture");
          c.loadImage(t[0], s || i, n, a, !1, () => {
            var e;
            null == c || !c || c && !c.params || c.destroyed || (i ? (t.css("background-image", `url("${i}")`), t.removeAttr("data-background")) : (n && (t.attr("srcset", n), t.removeAttr("data-srcset")), a && (t.attr("sizes", a), t.removeAttr("data-sizes")), r.length && r.children("source").each(e => {
              e = L(e);
              e.attr("data-srcset") && (e.attr("srcset", e.attr("data-srcset")), e.removeAttr("data-srcset"))
            }), s && (t.attr("src", s), t.removeAttr("data-src"))), t.addClass(l.loadedClass).removeClass(l.loadingClass), d.find("." + l.preloaderClass).remove(), c.params.loop && o && (e = d.attr("data-swiper-slide-index"), d.hasClass(c.params.slideDuplicateClass) ? p(c.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${c.params.slideDuplicateClass})`).index(), !1) : p(c.$wrapperEl.children(`.${c.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(), !1)), h("lazyImageReady", d[0], t[0]), c.params.autoHeight && c.updateAutoHeight())
          }), h("lazyImageLoad", d[0], t[0])
        })
      }
    }

    function l() {
      const {
        $wrapperEl: t,
        params: i,
        slides: s,
        activeIndex: n
      } = c, a = c.virtual && i.virtual.enabled, e = i.lazy;
      let r = i.slidesPerView;

      function o(e) {
        if (a) {
          if (t.children(`.${i.slideClass}[data-swiper-slide-index="${e}"]`).length) return 1
        } else if (s[e]) return 1
      }

      function l(e) {
        return a ? L(e).attr("data-swiper-slide-index") : L(e).index()
      }
      if ("auto" === r && (r = 0), d = d || !0, c.params.watchSlidesProgress) t.children("." + i.slideVisibleClass).each(e => {
        p(a ? L(e).attr("data-swiper-slide-index") : L(e).index())
      });
      else if (1 < r)
        for (let e = n; e < n + r; e += 1) o(e) && p(e);
      else p(n);
      if (e.loadPrevNext)
        if (1 < r || e.loadPrevNextAmount && 1 < e.loadPrevNextAmount) {
          const t = e.loadPrevNextAmount,
            c = Math.ceil(r),
            i = Math.min(n + c + Math.max(t, c), s.length),
            a = Math.max(n - Math.max(c, t), 0);
          for (let e = n + c; e < i; e += 1) o(e) && p(e);
          for (let e = a; e < n; e += 1) o(e) && p(e)
        } else {
          const c = t.children("." + i.slideNextClass),
            s = (0 < c.length && p(l(c)), t.children("." + i.slidePrevClass));
          0 < s.length && p(l(s))
        }
    }

    function u() {
      var e = P();
      if (c && !c.destroyed) {
        var i = c.params.lazy.scrollingElement ? L(c.params.lazy.scrollingElement) : L(e),
          s = i[0] === e,
          n = s ? e.innerWidth : i[0].offsetWidth,
          a = s ? e.innerHeight : i[0].offsetHeight,
          s = c.$el.offset(),
          e = c["rtlTranslate"];
        let t = !1;
        e && (s.left -= c.$el[0].scrollLeft);
        var r = [
          [s.left, s.top],
          [s.left + c.width, s.top],
          [s.left, s.top + c.height],
          [s.left + c.width, s.top + c.height]
        ];
        for (let e = 0; e < r.length; e += 1) {
          const c = r[e];
          0 <= c[0] && c[0] <= n && 0 <= c[1] && c[1] <= a && (0 === c[0] && 0 === c[1] || (t = !0))
        }
        e = !("touchstart" !== c.touchEvents.start || !c.support.passiveListener || !c.params.passiveListeners) && {
          passive: !0,
          capture: !1
        };
        t ? (l(), i.off("scroll", u, e)) : o || (o = !0, i.on("scroll", u, e))
      }
    }
    i("beforeInit", () => {
      c.params.lazy.enabled && c.params.preloadImages && (c.params.preloadImages = !1)
    }), i("init", () => {
      c.params.lazy.enabled && (c.params.lazy.checkInView ? u : l)()
    }), i("scroll", () => {
      c.params.freeMode && c.params.freeMode.enabled && !c.params.freeMode.sticky && l()
    }), i("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
      c.params.lazy.enabled && (c.params.lazy.checkInView ? u : l)()
    }), i("transitionStart", () => {
      c.params.lazy.enabled && (c.params.lazy.loadOnTransitionStart || !c.params.lazy.loadOnTransitionStart && !d) && (c.params.lazy.checkInView ? u : l)()
    }), i("transitionEnd", () => {
      c.params.lazy.enabled && !c.params.lazy.loadOnTransitionStart && (c.params.lazy.checkInView ? u : l)()
    }), i("slideChange", () => {
      var {
        lazy: e,
        cssMode: t,
        watchSlidesProgress: i,
        touchReleaseOnEdges: s,
        resistanceRatio: n
      } = c.params;
      e.enabled && (t || i && (s || 0 === n)) && l()
    }), i("destroy", () => {
      c.$el && c.$el.find("." + c.params.lazy.loadingClass).removeClass(c.params.lazy.loadingClass)
    }), Object.assign(c.lazy, {
      load: l,
      loadInSlide: p
    })
  }, function (e) {
    let {
      swiper: o,
      extendParams: t,
      on: i
    } = e;

    function l(e, t) {
      const i = function () {
        let i, s, n;
        return (e, t) => {
          for (s = -1, i = e.length; 1 < i - s;) e[n = i + s >> 1] <= t ? s = n : i = n;
          return i
        }
      }();
      let s, n;
      return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function (e) {
        return e ? (n = i(this.x, e), s = n - 1, (e - this.x[s]) * (this.y[n] - this.y[s]) / (this.x[n] - this.x[s]) + this.y[s]) : 0
      }, this
    }

    function s() {
      o.controller.control && o.controller.spline && (o.controller.spline = void 0, delete o.controller.spline)
    }
    t({
      controller: {
        control: void 0,
        inverse: !1,
        by: "slide"
      }
    }), o.controller = {
      control: void 0
    }, i("beforeInit", () => {
      o.controller.control = o.params.controller.control
    }), i("update", () => {
      s()
    }), i("resize", () => {
      s()
    }), i("observerUpdate", () => {
      s()
    }), i("setTranslate", (e, t, i) => {
      o.controller.control && o.controller.setTranslate(t, i)
    }), i("setTransition", (e, t, i) => {
      o.controller.control && o.controller.setTransition(t, i)
    }), Object.assign(o.controller, {
      setTranslate: function (e, t) {
        var i = o.controller.control;
        let s, n;
        var a = o.constructor;

        function r(e) {
          var t, i = o.rtlTranslate ? -o.translate : o.translate;
          "slide" === o.params.controller.by && (t = e, o.controller.spline || (o.controller.spline = o.params.loop ? new l(o.slidesGrid, t.slidesGrid) : new l(o.snapGrid, t.snapGrid)), n = -o.controller.spline.interpolate(-i)), n && "container" !== o.params.controller.by || (s = (e.maxTranslate() - e.minTranslate()) / (o.maxTranslate() - o.minTranslate()), n = (i - o.minTranslate()) * s + e.minTranslate()), o.params.controller.inverse && (n = e.maxTranslate() - n), e.updateProgress(n), e.setTranslate(n, o), e.updateActiveIndex(), e.updateSlidesClasses()
        }
        if (Array.isArray(i))
          for (let e = 0; e < i.length; e += 1) i[e] !== t && i[e] instanceof a && r(i[e]);
        else i instanceof a && t !== i && r(i)
      },
      setTransition: function (t, e) {
        const i = o.constructor,
          s = o.controller.control;
        let n;

        function a(e) {
          e.setTransition(t, o), 0 !== t && (e.transitionStart(), e.params.autoHeight && C(() => {
            e.updateAutoHeight()
          }), e.$wrapperEl.transitionEnd(() => {
            s && (e.params.loop && "slide" === o.params.controller.by && e.loopFix(), e.transitionEnd())
          }))
        }
        if (Array.isArray(s))
          for (n = 0; n < s.length; n += 1) s[n] !== e && s[n] instanceof i && a(s[n]);
        else s instanceof i && e !== s && a(s)
      }
    })
  }, function (e) {
    let {
      swiper: r,
      extendParams: t,
      on: i
    } = e, o = (t({
      a11y: {
        enabled: !0,
        notificationClass: "swiper-notification",
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
        firstSlideMessage: "This is the first slide",
        lastSlideMessage: "This is the last slide",
        paginationBulletMessage: "Go to slide {{index}}",
        slideLabelMessage: "{{index}} / {{slidesLength}}",
        containerMessage: null,
        containerRoleDescriptionMessage: null,
        itemRoleDescriptionMessage: null,
        slideRole: "group",
        id: null
      }
    }), r.a11y = {
      clicked: !1
    }, null);

    function s(e) {
      var t = o;
      0 !== t.length && (t.html(""), t.html(e))
    }

    function n(e) {
      e.attr("tabIndex", "0")
    }

    function a(e) {
      e.attr("tabIndex", "-1")
    }

    function l(e, t) {
      e.attr("role", t)
    }

    function d(e, t) {
      e.attr("aria-roledescription", t)
    }

    function c(e, t) {
      e.attr("aria-label", t)
    }

    function h(e) {
      e.attr("aria-disabled", !0)
    }

    function p(e) {
      e.attr("aria-disabled", !1)
    }

    function u(e) {
      var t;
      13 !== e.keyCode && 32 !== e.keyCode || (t = r.params.a11y, e = L(e.target), r.navigation && r.navigation.$nextEl && e.is(r.navigation.$nextEl) && (r.isEnd && !r.params.loop || r.slideNext(), r.isEnd ? s(t.lastSlideMessage) : s(t.nextSlideMessage)), r.navigation && r.navigation.$prevEl && e.is(r.navigation.$prevEl) && (r.isBeginning && !r.params.loop || r.slidePrev(), r.isBeginning ? s(t.firstSlideMessage) : s(t.prevSlideMessage)), r.pagination && e.is(k(r.params.pagination.bulletClass)) && e[0].click())
    }

    function f() {
      return r.pagination && r.pagination.bullets && r.pagination.bullets.length
    }

    function m() {
      return f() && r.params.pagination.clickable
    }
    const g = (e, t, i) => {
        n(e), "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", u)), c(e, i), e.attr("aria-controls", t)
      },
      v = () => {
        r.a11y.clicked = !0
      },
      b = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            r.destroyed || (r.a11y.clicked = !1)
          })
        })
      },
      y = e => {
        var t, i, s;
        r.a11y.clicked || (t = e.target.closest("." + r.params.slideClass)) && r.slides.includes(t) && (i = r.slides.indexOf(t) === r.activeIndex, s = r.params.watchSlidesProgress && r.visibleSlides && r.visibleSlides.includes(t), i || s || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (r.isHorizontal() ? r.el.scrollLeft = 0 : r.el.scrollTop = 0, r.slideTo(r.slides.indexOf(t), 0)))
      },
      w = () => {
        const i = r.params.a11y,
          s = (i.itemRoleDescriptionMessage && d(L(r.slides), i.itemRoleDescriptionMessage), i.slideRole && l(L(r.slides), i.slideRole), (r.params.loop ? r.slides.filter(e => !e.classList.contains(r.params.slideDuplicateClass)) : r.slides).length);
        i.slideLabelMessage && r.slides.each((e, t) => {
          e = L(e), t = r.params.loop ? parseInt(e.attr("data-swiper-slide-index"), 10) : t;
          c(e, i.slideLabelMessage.replace(/\{\{index\}\}/, t + 1).replace(/\{\{slidesLength\}\}/, s))
        })
      };
    i("beforeInit", () => {
      o = L(`<span class="${r.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
    }), i("afterInit", () => {
      if (r.params.a11y.enabled) {
        var i = r.params.a11y,
          s = (r.$el.append(o), r.$el),
          s = (i.containerRoleDescriptionMessage && d(s, i.containerRoleDescriptionMessage), i.containerMessage && c(s, i.containerMessage), r.$wrapperEl),
          n = i.id || s.attr("id") || "swiper-wrapper-" + "x".repeat(n = void 0 === (n = 16) ? 16 : n).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)),
          a = r.params.autoplay && r.params.autoplay.enabled ? "off" : "polite";
        let e, t;
        s.attr("id", n), s.attr("aria-live", a), w(), r.navigation && r.navigation.$nextEl && (e = r.navigation.$nextEl), r.navigation && r.navigation.$prevEl && (t = r.navigation.$prevEl), e && e.length && g(e, n, i.nextSlideMessage), t && t.length && g(t, n, i.prevSlideMessage), m() && r.pagination.$el.on("keydown", k(r.params.pagination.bulletClass), u), r.$el.on("focus", y, !0), r.$el.on("pointerdown", v, !0), r.$el.on("pointerup", b, !0)
      }
    }), i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
      r.params.a11y.enabled && w()
    }), i("fromEdge toEdge afterInit lock unlock", () => {
      var e, t;
      r.params.a11y.enabled && !r.params.loop && !r.params.rewind && r.navigation && ({
        $nextEl: e,
        $prevEl: t
      } = r.navigation, t && 0 < t.length && (r.isBeginning ? (h(t), a) : (p(t), n))(t), e && 0 < e.length) && (r.isEnd ? (h(e), a) : (p(e), n))(e)
    }), i("paginationUpdate", () => {
      if (r.params.a11y.enabled) {
        const t = r.params.a11y;
        f() && r.pagination.bullets.each(e => {
          e = L(e);
          r.params.pagination.clickable && (n(e), r.params.pagination.renderBullet || (l(e, "button"), c(e, t.paginationBulletMessage.replace(/\{\{index\}\}/, e.index() + 1)))), e.is("." + r.params.pagination.bulletActiveClass) ? e.attr("aria-current", "true") : e.removeAttr("aria-current")
        })
      }
    }), i("destroy", () => {
      if (r.params.a11y.enabled) {
        let e, t;
        o && 0 < o.length && o.remove(), r.navigation && r.navigation.$nextEl && (e = r.navigation.$nextEl), r.navigation && r.navigation.$prevEl && (t = r.navigation.$prevEl), e && e.off("keydown", u), t && t.off("keydown", u), m() && r.pagination.$el.off("keydown", k(r.params.pagination.bulletClass), u), r.$el.off("focus", y, !0), r.$el.off("pointerdown", v, !0), r.$el.off("pointerup", b, !0)
      }
    })
  }, function (e) {
    let {
      swiper: r,
      extendParams: t,
      on: i
    } = e, a = (t({
      history: {
        enabled: !1,
        root: "",
        replaceState: !1,
        key: "slides",
        keepQuery: !1
      }
    }), !1), s = {};
    const o = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
      n = e => {
        var t = P(),
          e = (e ? new URL(e) : t.location).pathname.slice(1).split("/").filter(e => "" !== e),
          t = e.length;
        return {
          key: e[t - 2],
          value: e[t - 1]
        }
      },
      l = (i, e) => {
        var s = P();
        if (a && r.params.history.enabled) {
          var n = r.params.url ? new URL(r.params.url) : s.location,
            e = r.slides.eq(e);
          let t = o(e.attr("data-history"));
          if (0 < r.params.history.root.length) {
            let e = r.params.history.root;
            "/" === e[e.length - 1] && (e = e.slice(0, e.length - 1)), t = e + `/${i}/` + t
          } else n.pathname.includes(i) || (t = i + "/" + t);
          r.params.history.keepQuery && (t += n.search);
          e = s.history.state;
          e && e.value === t || (r.params.history.replaceState ? s.history.replaceState({
            value: t
          }, null, t) : s.history.pushState({
            value: t
          }, null, t))
        }
      },
      d = (i, s, n) => {
        if (s)
          for (let e = 0, t = r.slides.length; e < t; e += 1) {
            var a = r.slides.eq(e);
            if (o(a.attr("data-history")) === s && !a.hasClass(r.params.slideDuplicateClass)) {
              const s = a.index();
              r.slideTo(s, i, n)
            }
          } else r.slideTo(0, i, n)
      },
      c = () => {
        s = n(r.params.url), d(r.params.speed, s.value, !1)
      };
    i("init", () => {
      var e;
      r.params.history.enabled && (e = P(), r.params.history) && (e.history && e.history.pushState ? (a = !0, ((s = n(r.params.url)).key || s.value) && (d(0, s.value, r.params.runCallbacksOnInit), r.params.history.replaceState || e.addEventListener("popstate", c))) : (r.params.history.enabled = !1, r.params.hashNavigation.enabled = !0))
    }), i("destroy", () => {
      var e;
      r.params.history.enabled && (e = P(), r.params.history.replaceState || e.removeEventListener("popstate", c))
    }), i("transitionEnd _freeModeNoMomentumRelease", () => {
      a && l(r.params.history.key, r.activeIndex)
    }), i("slideChange", () => {
      a && r.params.cssMode && l(r.params.history.key, r.activeIndex)
    })
  }, function (e) {
    let {
      swiper: n,
      extendParams: t,
      emit: i,
      on: s
    } = e, a = !1;
    const r = T(),
      o = P(),
      l = (t({
        hashNavigation: {
          enabled: !1,
          replaceState: !1,
          watchState: !1
        }
      }), () => {
        i("hashChange");
        var e = r.location.hash.replace("#", "");
        e !== n.slides.eq(n.activeIndex).attr("data-hash") && void 0 !== (e = n.$wrapperEl.children(`.${n.params.slideClass}[data-hash="${e}"]`).index()) && n.slideTo(e)
      }),
      d = () => {
        var e;
        a && n.params.hashNavigation.enabled && (n.params.hashNavigation.replaceState && o.history && o.history.replaceState ? o.history.replaceState(null, null, "#" + n.slides.eq(n.activeIndex).attr("data-hash") || "") : (e = (e = n.slides.eq(n.activeIndex)).attr("data-hash") || e.attr("data-history"), r.location.hash = e || ""), i("hashSet"))
      };
    s("init", () => {
      if (n.params.hashNavigation.enabled && !(!n.params.hashNavigation.enabled || n.params.history && n.params.history.enabled)) {
        a = !0;
        const s = r.location.hash.replace("#", "");
        if (s)
          for (let e = 0, t = n.slides.length; e < t; e += 1) {
            var i = n.slides.eq(e);
            if ((i.attr("data-hash") || i.attr("data-history")) === s && !i.hasClass(n.params.slideDuplicateClass)) {
              const s = i.index();
              n.slideTo(s, 0, n.params.runCallbacksOnInit, !0)
            }
          }
        n.params.hashNavigation.watchState && L(o).on("hashchange", l)
      }
    }), s("destroy", () => {
      n.params.hashNavigation.enabled && n.params.hashNavigation.watchState && L(o).off("hashchange", l)
    }), s("transitionEnd _freeModeNoMomentumRelease", () => {
      a && d()
    }), s("slideChange", () => {
      a && n.params.cssMode && d()
    })
  }, function (e) {
    let i, {
      swiper: s,
      extendParams: t,
      on: n,
      emit: a
    } = e;

    function r() {
      if (s.size) {
        var t = s.slides.eq(s.activeIndex);
        let e = s.params.autoplay.delay;
        t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || s.params.autoplay.delay), clearTimeout(i), i = C(() => {
          let e;
          s.params.autoplay.reverseDirection ? s.params.loop ? (s.loopFix(), e = s.slidePrev(s.params.speed, !0, !0), a("autoplay")) : s.isBeginning ? s.params.autoplay.stopOnLastSlide ? l() : (e = s.slideTo(s.slides.length - 1, s.params.speed, !0, !0), a("autoplay")) : (e = s.slidePrev(s.params.speed, !0, !0), a("autoplay")) : s.params.loop ? (s.loopFix(), e = s.slideNext(s.params.speed, !0, !0), a("autoplay")) : s.isEnd ? s.params.autoplay.stopOnLastSlide ? l() : (e = s.slideTo(0, s.params.speed, !0, !0), a("autoplay")) : (e = s.slideNext(s.params.speed, !0, !0), a("autoplay")), (s.params.cssMode && s.autoplay.running || !1 === e) && r()
        }, e)
      } else s.autoplay.running = !1, s.autoplay.paused = !1
    }

    function o() {
      return void 0 === i && !s.autoplay.running && (s.autoplay.running = !0, a("autoplayStart"), r(), !0)
    }

    function l() {
      return !!s.autoplay.running && void 0 !== i && (i && (clearTimeout(i), i = void 0), s.autoplay.running = !1, a("autoplayStop"), !0)
    }

    function d(e) {
      !s.autoplay.running || s.autoplay.paused || (i && clearTimeout(i), s.autoplay.paused = !0, 0 !== e && s.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach(e => {
        s.$wrapperEl[0].addEventListener(e, h)
      }) : (s.autoplay.paused = !1, r()))
    }

    function c() {
      var e = T();
      "hidden" === e.visibilityState && s.autoplay.running && d(), "visible" === e.visibilityState && s.autoplay.paused && (r(), s.autoplay.paused = !1)
    }

    function h(e) {
      s && !s.destroyed && s.$wrapperEl && e.target === s.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(e => {
        s.$wrapperEl[0].removeEventListener(e, h)
      }), s.autoplay.paused = !1, (s.autoplay.running ? r : l)())
    }

    function p() {
      (s.params.autoplay.disableOnInteraction ? l : (a("autoplayPause"), d))(), ["transitionend", "webkitTransitionEnd"].forEach(e => {
        s.$wrapperEl[0].removeEventListener(e, h)
      })
    }

    function u() {
      s.params.autoplay.disableOnInteraction || (s.autoplay.paused = !1, a("autoplayResume"), r())
    }
    s.autoplay = {
      running: !1,
      paused: !1
    }, t({
      autoplay: {
        enabled: !1,
        delay: 3e3,
        waitForTransition: !0,
        disableOnInteraction: !0,
        stopOnLastSlide: !1,
        reverseDirection: !1,
        pauseOnMouseEnter: !1
      }
    }), n("init", () => {
      s.params.autoplay.enabled && (o(), T().addEventListener("visibilitychange", c), s.params.autoplay.pauseOnMouseEnter) && (s.$el.on("mouseenter", p), s.$el.on("mouseleave", u))
    }), n("beforeTransitionStart", (e, t, i) => {
      s.autoplay.running && (i || !s.params.autoplay.disableOnInteraction ? s.autoplay.pause(t) : l())
    }), n("sliderFirstMove", () => {
      s.autoplay.running && (s.params.autoplay.disableOnInteraction ? l : d)()
    }), n("touchEnd", () => {
      s.params.cssMode && s.autoplay.paused && !s.params.autoplay.disableOnInteraction && r()
    }), n("destroy", () => {
      s.$el.off("mouseenter", p), s.$el.off("mouseleave", u), s.autoplay.running && l(), T().removeEventListener("visibilitychange", c)
    }), Object.assign(s.autoplay, {
      pause: d,
      run: r,
      start: o,
      stop: l
    })
  }, function (e) {
    let {
      swiper: l,
      extendParams: t,
      on: i
    } = e, s = (t({
      thumbs: {
        swiper: null,
        multipleActiveThumbs: !0,
        autoScrollOffset: 0,
        slideThumbActiveClass: "swiper-slide-thumb-active",
        thumbsContainerClass: "swiper-thumbs"
      }
    }), !1), n = !1;

    function a() {
      var e = l.thumbs.swiper;
      if (e && !e.destroyed) {
        const i = e.clickedIndex,
          s = e.clickedSlide;
        if (!(s && L(s).hasClass(l.params.thumbs.slideThumbActiveClass) || null == i)) {
          let t;
          if (t = e.params.loop ? parseInt(L(e.clickedSlide).attr("data-swiper-slide-index"), 10) : i, l.params.loop) {
            let e = l.activeIndex;
            l.slides.eq(e).hasClass(l.params.slideDuplicateClass) && (l.loopFix(), l._clientLeft = l.$wrapperEl[0].clientLeft, e = l.activeIndex);
            const i = l.slides.eq(e).prevAll(`[data-swiper-slide-index="${t}"]`).eq(0).index(),
              s = l.slides.eq(e).nextAll(`[data-swiper-slide-index="${t}"]`).eq(0).index();
            t = void 0 === i || void 0 !== s && s - e < e - i ? s : i
          }
          l.slideTo(t)
        }
      }
    }

    function r() {
      var e = l.params["thumbs"];
      if (s) return !1;
      s = !0;
      var t = l.constructor;
      return e.swiper instanceof t ? (l.thumbs.swiper = e.swiper, Object.assign(l.thumbs.swiper.originalParams, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      }), Object.assign(l.thumbs.swiper.params, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      })) : d(e.swiper) && (e = Object.assign({}, e.swiper), Object.assign(e, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      }), l.thumbs.swiper = new t(e), n = !0), l.thumbs.swiper.$el.addClass(l.params.thumbs.thumbsContainerClass), l.thumbs.swiper.on("tap", a), !0
    }

    function o(s) {
      var n = l.thumbs.swiper;
      if (n && !n.destroyed) {
        const o = "auto" === n.params.slidesPerView ? n.slidesPerViewDynamic() : n.params.slidesPerView;
        let t = 1;
        var i = l.params.thumbs.slideThumbActiveClass;
        if (1 < l.params.slidesPerView && !l.params.centeredSlides && (t = l.params.slidesPerView), l.params.thumbs.multipleActiveThumbs || (t = 1), t = Math.floor(t), n.slides.removeClass(i), n.params.loop || n.params.virtual && n.params.virtual.enabled)
          for (let e = 0; e < t; e += 1) n.$wrapperEl.children(`[data-swiper-slide-index="${l.realIndex+e}"]`).addClass(i);
        else
          for (let e = 0; e < t; e += 1) n.slides.eq(l.realIndex + e).addClass(i);
        var a = l.params.thumbs.autoScrollOffset,
          r = a && !n.params.loop;
        if (l.realIndex !== n.realIndex || r) {
          let e, t, i = n.activeIndex;
          if (n.params.loop) {
            n.slides.eq(i).hasClass(n.params.slideDuplicateClass) && (n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft, i = n.activeIndex);
            const s = n.slides.eq(i).prevAll(`[data-swiper-slide-index="${l.realIndex}"]`).eq(0).index(),
              o = n.slides.eq(i).nextAll(`[data-swiper-slide-index="${l.realIndex}"]`).eq(0).index();
            e = void 0 === s ? o : void 0 === o ? s : o - i == i - s ? 1 < n.params.slidesPerGroup ? o : i : o - i < i - s ? o : s, t = l.activeIndex > l.previousIndex ? "next" : "prev"
          } else e = l.realIndex, t = e > l.previousIndex ? "next" : "prev";
          r && (e += "next" === t ? a : -1 * a), n.visibleSlidesIndexes && n.visibleSlidesIndexes.indexOf(e) < 0 && (n.params.centeredSlides ? e = e > i ? e - Math.floor(o / 2) + 1 : e + Math.floor(o / 2) - 1 : e > i && n.params.slidesPerGroup, n.slideTo(e, s ? 0 : void 0))
        }
      }
    }
    l.thumbs = {
      swiper: null
    }, i("beforeInit", () => {
      var e = l.params["thumbs"];
      e && e.swiper && (r(), o(!0))
    }), i("slideChange update resize observerUpdate", () => {
      o()
    }), i("setTransition", (e, t) => {
      var i = l.thumbs.swiper;
      i && !i.destroyed && i.setTransition(t)
    }), i("beforeDestroy", () => {
      var e = l.thumbs.swiper;
      e && !e.destroyed && n && e.destroy()
    }), Object.assign(l.thumbs, {
      init: r,
      update: o
    })
  }, function (e) {
    let {
      swiper: p,
      extendParams: t,
      emit: u,
      once: f
    } = e;
    t({
      freeMode: {
        enabled: !1,
        momentum: !0,
        momentumRatio: 1,
        momentumBounce: !0,
        momentumBounceRatio: 1,
        momentumVelocityRatio: 1,
        sticky: !1,
        minimumVelocity: .02
      }
    }), Object.assign(p, {
      freeMode: {
        onTouchStart: function () {
          var e = p.getTranslate();
          p.setTranslate(e), p.setTransition(0), p.touchEventsData.velocities.length = 0, p.freeMode.onTouchEnd({
            currentPos: p.rtl ? p.translate : -p.translate
          })
        },
        onTouchMove: function () {
          var {
            touchEventsData: e,
            touches: t
          } = p;
          0 === e.velocities.length && e.velocities.push({
            position: t[p.isHorizontal() ? "startX" : "startY"],
            time: e.touchStartTime
          }), e.velocities.push({
            position: t[p.isHorizontal() ? "currentX" : "currentY"],
            time: v()
          })
        },
        onTouchEnd: function (a) {
          let r = a["currentPos"];
          const {
            params: o,
            $wrapperEl: l,
            rtlTranslate: d,
            snapGrid: c,
            touchEventsData: h
          } = p, e = v() - h.touchStartTime;
          if (r < -p.minTranslate()) p.slideTo(p.activeIndex);
          else if (r > -p.maxTranslate()) p.slides.length < c.length ? p.slideTo(c.length - 1) : p.slideTo(p.slides.length - 1);
          else {
            if (o.freeMode.momentum) {
              if (1 < h.velocities.length) {
                const a = h.velocities.pop(),
                  r = h.velocities.pop(),
                  u = a.position - r.position,
                  f = a.time - r.time;
                p.velocity = u / f, p.velocity /= 2, Math.abs(p.velocity) < o.freeMode.minimumVelocity && (p.velocity = 0), (150 < f || 300 < v() - a.time) && (p.velocity = 0)
              } else p.velocity = 0;
              p.velocity *= o.freeMode.momentumVelocityRatio, h.velocities.length = 0;
              let e = 1e3 * o.freeMode.momentumRatio;
              const r = p.velocity * e;
              let i = p.translate + r;
              d && (i = -i);
              let t, s = !1;
              a = 20 * Math.abs(p.velocity) * o.freeMode.momentumBounceRatio;
              let n;
              if (i < p.maxTranslate()) o.freeMode.momentumBounce ? (i + p.maxTranslate() < -a && (i = p.maxTranslate() - a), t = p.maxTranslate(), s = !0, h.allowMomentumBounce = !0) : i = p.maxTranslate(), o.loop && o.centeredSlides && (n = !0);
              else if (i > p.minTranslate()) o.freeMode.momentumBounce ? (i - p.minTranslate() > a && (i = p.minTranslate() + a), t = p.minTranslate(), s = !0, h.allowMomentumBounce = !0) : i = p.minTranslate(), o.loop && o.centeredSlides && (n = !0);
              else if (o.freeMode.sticky) {
                let t;
                for (let e = 0; e < c.length; e += 1)
                  if (c[e] > -i) {
                    t = e;
                    break
                  } i = -(i = Math.abs(c[t] - i) < Math.abs(c[t - 1] - i) || "next" === p.swipeDirection ? c[t] : c[t - 1])
              }
              if (n && f("transitionEnd", () => {
                  p.loopFix()
                }), 0 !== p.velocity) {
                if (e = d ? Math.abs((-i - p.translate) / p.velocity) : Math.abs((i - p.translate) / p.velocity), o.freeMode.sticky) {
                  const r = Math.abs((d ? -i : i) - p.translate),
                    u = p.slidesSizesGrid[p.activeIndex];
                  e = r < u ? o.speed : r < 2 * u ? 1.5 * o.speed : 2.5 * o.speed
                }
              } else if (o.freeMode.sticky) return void p.slideToClosest();
              o.freeMode.momentumBounce && s ? (p.updateProgress(t), p.setTransition(e), p.setTranslate(i), p.transitionStart(!0, p.swipeDirection), p.animating = !0, l.transitionEnd(() => {
                p && !p.destroyed && h.allowMomentumBounce && (u("momentumBounce"), p.setTransition(o.speed), setTimeout(() => {
                  p.setTranslate(t), l.transitionEnd(() => {
                    p && !p.destroyed && p.transitionEnd()
                  })
                }, 0))
              })) : p.velocity ? (u("_freeModeNoMomentumRelease"), p.updateProgress(i), p.setTransition(e), p.setTranslate(i), p.transitionStart(!0, p.swipeDirection), p.animating || (p.animating = !0, l.transitionEnd(() => {
                p && !p.destroyed && p.transitionEnd()
              }))) : p.updateProgress(i), p.updateActiveIndex(), p.updateSlidesClasses()
            } else {
              if (o.freeMode.sticky) return void p.slideToClosest();
              o.freeMode && u("_freeModeNoMomentumRelease")
            }(!o.freeMode.momentum || e >= o.longSwipesMs) && (p.updateProgress(), p.updateActiveIndex(), p.updateSlidesClasses())
          }
        }
      }
    })
  }, function (e) {
    let h, p, u, {
      swiper: f,
      extendParams: t
    } = e;
    t({
      grid: {
        rows: 1,
        fill: "column"
      }
    }), f.grid = {
      initSlides: e => {
        var t = f.params["slidesPerView"],
          {
            rows: i,
            fill: s
          } = f.params.grid;
        p = h / i, u = Math.floor(e / i), h = Math.floor(e / i) === e / i ? e : Math.ceil(e / i) * i, "auto" !== t && "row" === s && (h = Math.max(h, t * i))
      },
      updateSlide: (e, t, i, s) => {
        var {
          slidesPerGroup: n,
          spaceBetween: a
        } = f.params, {
          rows: r,
          fill: o
        } = f.params.grid;
        let l, d, c;
        if ("row" === o && 1 < n) {
          const p = Math.floor(e / (n * r)),
            u = e - r * n * p,
            f = 0 === p ? n : Math.min(Math.ceil((i - p * r * n) / r), n);
          c = Math.floor(u / f), l = (d = u - c * f + p * n) + c * h / r, t.css({
            "-webkit-order": l,
            order: l
          })
        } else "column" === o ? (d = Math.floor(e / r), c = e - d * r, (d > u || d === u && c === r - 1) && (c += 1) >= r && (c = 0, d += 1)) : (c = Math.floor(e / p), d = e - c * p);
        t.css(s("margin-top"), 0 !== c ? a && a + "px" : "")
      },
      updateWrapperSize: (i, s, e) => {
        var {
          spaceBetween: t,
          centeredSlides: n,
          roundLengths: a
        } = f.params, r = f.params.grid["rows"];
        if (f.virtualSize = (i + t) * h, f.virtualSize = Math.ceil(f.virtualSize / r) - t, f.$wrapperEl.css({
            [e("width")]: f.virtualSize + t + "px"
          }), n) {
          s.splice(0, s.length);
          const i = [];
          for (let t = 0; t < s.length; t += 1) {
            let e = s[t];
            a && (e = Math.floor(e)), s[t] < f.virtualSize + s[0] && i.push(e)
          }
          s.push(...i)
        }
      }
    }
  }, function (e) {
    e = e.swiper;
    Object.assign(e, {
      appendSlide: function (t) {
        var {
          $wrapperEl: i,
          params: e
        } = this;
        if (e.loop && this.loopDestroy(), "object" == typeof t && "length" in t)
          for (let e = 0; e < t.length; e += 1) t[e] && i.append(t[e]);
        else i.append(t);
        e.loop && this.loopCreate(), e.observer || this.update()
      }.bind(e),
      prependSlide: function (t) {
        var e = this,
          {
            params: i,
            $wrapperEl: s,
            activeIndex: n
          } = e;
        i.loop && e.loopDestroy();
        let a = n + 1;
        if ("object" == typeof t && "length" in t) {
          for (let e = 0; e < t.length; e += 1) t[e] && s.prepend(t[e]);
          a = n + t.length
        } else s.prepend(t);
        i.loop && e.loopCreate(), i.observer || e.update(), e.slideTo(a, 0, !1)
      }.bind(e),
      addSlide: function (t, i) {
        var s = this,
          {
            $wrapperEl: n,
            params: a,
            activeIndex: r
          } = s;
        let o = r;
        if (a.loop && (o -= s.loopedSlides, s.loopDestroy(), s.slides = n.children("." + a.slideClass)), r = s.slides.length, t <= 0) s.prependSlide(i);
        else if (r <= t) s.appendSlide(i);
        else {
          let e = o > t ? o + 1 : o;
          var l = [];
          for (let e = r - 1; e >= t; --e) {
            const t = s.slides.eq(e);
            t.remove(), l.unshift(t)
          }
          if ("object" == typeof i && "length" in i) {
            for (let e = 0; e < i.length; e += 1) i[e] && n.append(i[e]);
            e = o > t ? o + i.length : o
          } else n.append(i);
          for (let e = 0; e < l.length; e += 1) n.append(l[e]);
          a.loop && s.loopCreate(), a.observer || s.update(), a.loop ? s.slideTo(e + s.loopedSlides, 0, !1) : s.slideTo(e, 0, !1)
        }
      }.bind(e),
      removeSlide: function (t) {
        var i = this,
          {
            params: e,
            $wrapperEl: s,
            activeIndex: n
          } = i;
        let a = n;
        e.loop && (a -= i.loopedSlides, i.loopDestroy(), i.slides = s.children("." + e.slideClass));
        let r, o = a;
        if ("object" == typeof t && "length" in t)
          for (let e = 0; e < t.length; e += 1) r = t[e], i.slides[r] && i.slides.eq(r).remove(), r < o && --o;
        else r = t, i.slides[r] && i.slides.eq(r).remove(), r < o && --o;
        o = Math.max(o, 0), e.loop && i.loopCreate(), e.observer || i.update(), e.loop ? i.slideTo(o + i.loopedSlides, 0, !1) : i.slideTo(o, 0, !1)
      }.bind(e),
      removeAllSlides: function () {
        var t = [];
        for (let e = 0; e < this.slides.length; e += 1) t.push(e);
        this.removeSlide(t)
      }.bind(e)
    })
  }, function (e) {
    let {
      swiper: r,
      extendParams: t,
      on: i
    } = e;
    t({
      fadeEffect: {
        crossFade: !1,
        transformEl: null
      }
    }), A({
      effect: "fade",
      swiper: r,
      on: i,
      setTranslate: () => {
        const s = r["slides"],
          n = r.params.fadeEffect;
        for (let i = 0; i < s.length; i += 1) {
          const s = r.slides.eq(i);
          let e = -s[0].swiperSlideOffset,
            t = (r.params.virtualTranslate || (e -= r.translate), 0);
          r.isHorizontal() || (t = e, e = 0);
          var a = r.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(s[0].progress), 0) : 1 + Math.min(Math.max(s[0].progress, -1), 0);
          O(n, s).css({
            opacity: a
          }).transform(`translate3d(${e}px, ${t}px, 0px)`)
        }
      },
      setTransition: e => {
        var t = r.params.fadeEffect["transformEl"];
        (t ? r.slides.find(t) : r.slides).transition(e), I({
          swiper: r,
          duration: e,
          transformEl: t,
          allSlides: !0
        })
      },
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !r.params.cssMode
      })
    })
  }, function (e) {
    let {
      swiper: m,
      extendParams: t,
      on: i
    } = e;
    t({
      cubeEffect: {
        slideShadows: !0,
        shadow: !0,
        shadowOffset: 20,
        shadowScale: .94
      }
    });
    const g = (e, t, i) => {
      let s = i ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
        n = i ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
      0 === s.length && (s = L(`<div class="swiper-slide-shadow-${i?"left":"top"}"></div>`), e.append(s)), 0 === n.length && (n = L(`<div class="swiper-slide-shadow-${i?"right":"bottom"}"></div>`), e.append(n)), s.length && (s[0].style.opacity = Math.max(-t, 0)), n.length && (n[0].style.opacity = Math.max(t, 0))
    };
    A({
      effect: "cube",
      swiper: m,
      on: i,
      setTranslate: () => {
        const {
          $el: e,
          $wrapperEl: t,
          slides: o,
          width: i,
          height: s,
          rtlTranslate: l,
          size: d,
          browser: n
        } = m, c = m.params.cubeEffect, h = m.isHorizontal(), p = m.virtual && m.params.virtual.enabled;
        let a, u = 0;
        c.shadow && (h ? (0 === (a = t.find(".swiper-cube-shadow")).length && (a = L('<div class="swiper-cube-shadow"></div>'), t.append(a)), a.css({
          height: i + "px"
        })) : 0 === (a = e.find(".swiper-cube-shadow")).length && (a = L('<div class="swiper-cube-shadow"></div>'), e.append(a)));
        for (let r = 0; r < o.length; r += 1) {
          const m = o.eq(r);
          let e = r,
            t = 90 * (e = p ? parseInt(m.attr("data-swiper-slide-index"), 10) : e),
            i = Math.floor(t / 360);
          l && (t = -t, i = Math.floor(-t / 360));
          const L = Math.max(Math.min(m[0].progress, 1), -1);
          let s = 0,
            n = 0,
            a = 0;
          e % 4 == 0 ? (s = 4 * -i * d, a = 0) : (e - 1) % 4 == 0 ? (s = 0, a = 4 * -i * d) : (e - 2) % 4 == 0 ? (s = d + 4 * i * d, a = d) : (e - 3) % 4 == 0 && (s = -d, a = 3 * d + 4 * d * i), l && (s = -s), h || (n = s, s = 0);
          var f = `rotateX(${h?0:-t}deg) rotateY(${h?t:0}deg) translate3d(${s}px, ${n}px, ${a}px)`;
          L <= 1 && -1 < L && (u = 90 * e + 90 * L, l) && (u = 90 * -e - 90 * L), m.transform(f), c.slideShadows && g(m, L, h)
        }
        if (t.css({
            "-webkit-transform-origin": `50% 50% -${d/2}px`,
            "transform-origin": `50% 50% -${d/2}px`
          }), c.shadow)
          if (h) a.transform(`translate3d(0px, ${i/2+c.shadowOffset}px, ${-i/2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`);
          else {
            const e = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
              m = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
              t = c.shadowScale,
              o = c.shadowScale / m,
              g = c.shadowOffset;
            a.transform(`scale3d(${t}, 1, ${o}) translate3d(0px, ${s/2+g}px, ${-s/2/o}px) rotateX(-90deg)`)
          } var r = n.isSafari || n.isWebView ? -d / 2 : 0;
        t.transform(`translate3d(0px,0,${r}px) rotateX(${m.isHorizontal()?0:u}deg) rotateY(${m.isHorizontal()?-u:0}deg)`), t[0].style.setProperty("--swiper-cube-translate-z", r + "px")
      },
      setTransition: e => {
        var {
          $el: t,
          slides: i
        } = m;
        i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), m.params.cubeEffect.shadow && !m.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
      },
      recreateShadows: () => {
        const i = m.isHorizontal();
        m.slides.each(e => {
          var t = Math.max(Math.min(e.progress, 1), -1);
          g(L(e), t, i)
        })
      },
      getEffectParams: () => m.params.cubeEffect,
      perspective: () => !0,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: !1,
        virtualTranslate: !0
      })
    })
  }, function (e) {
    let {
      swiper: h,
      extendParams: t,
      on: i
    } = e;
    t({
      flipEffect: {
        slideShadows: !0,
        limitRotation: !0,
        transformEl: null
      }
    });
    const p = (e, t, i) => {
      let s = h.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
        n = h.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
      0 === s.length && (s = z(i, e, h.isHorizontal() ? "left" : "top")), 0 === n.length && (n = z(i, e, h.isHorizontal() ? "right" : "bottom")), s.length && (s[0].style.opacity = Math.max(-t, 0)), n.length && (n[0].style.opacity = Math.max(t, 0))
    };
    A({
      effect: "flip",
      swiper: h,
      on: i,
      setTranslate: () => {
        var {
          slides: r,
          rtlTranslate: o
        } = h, l = h.params.flipEffect;
        for (let a = 0; a < r.length; a += 1) {
          var d = r.eq(a);
          let e = d[0].progress;
          h.params.flipEffect.limitRotation && (e = Math.max(Math.min(d[0].progress, 1), -1));
          var c = d[0].swiperSlideOffset;
          let t = -180 * e,
            i = 0,
            s = h.params.cssMode ? -c - h.translate : -c,
            n = 0;
          h.isHorizontal() ? o && (t = -t) : (n = s, s = 0, i = -t, t = 0), d[0].style.zIndex = -Math.abs(Math.round(e)) + r.length, l.slideShadows && p(d, e, l);
          c = `translate3d(${s}px, ${n}px, 0px) rotateX(${i}deg) rotateY(${t}deg)`;
          O(l, d).transform(c)
        }
      },
      setTransition: e => {
        var t = h.params.flipEffect["transformEl"];
        (t ? h.slides.find(t) : h.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), I({
          swiper: h,
          duration: e,
          transformEl: t
        })
      },
      recreateShadows: () => {
        const s = h.params.flipEffect;
        h.slides.each(e => {
          var t = L(e);
          let i = t[0].progress;
          h.params.flipEffect.limitRotation && (i = Math.max(Math.min(e.progress, 1), -1)), p(t, i, s)
        })
      },
      getEffectParams: () => h.params.flipEffect,
      perspective: () => !0,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !h.params.cssMode
      })
    })
  }, function (e) {
    let {
      swiper: y,
      extendParams: t,
      on: i
    } = e;
    t({
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        scale: 1,
        modifier: 1,
        slideShadows: !0,
        transformEl: null
      }
    }), A({
      effect: "coverflow",
      swiper: y,
      on: i,
      setTranslate: () => {
        const {
          width: e,
          height: l,
          slides: d,
          slidesSizesGrid: c
        } = y, h = y.params.coverflowEffect, p = y.isHorizontal(), u = y.translate, f = p ? e / 2 - u : l / 2 - u, m = p ? h.rotate : -h.rotate, g = h.depth;
        for (let o = 0, e = d.length; o < e; o += 1) {
          const y = d.eq(o),
            l = c[o],
            u = (f - y[0].swiperSlideOffset - l / 2) / l,
            b = "function" == typeof h.modifier ? h.modifier(u) : u * h.modifier;
          let e = p ? m * b : 0,
            t = p ? 0 : m * b,
            i = -g * Math.abs(b),
            s = h.stretch,
            n = ("string" == typeof s && -1 !== s.indexOf("%") && (s = parseFloat(h.stretch) / 100 * l), p ? 0 : s * b),
            a = p ? s * b : 0,
            r = 1 - (1 - h.scale) * Math.abs(b);
          Math.abs(a) < .001 && (a = 0), Math.abs(n) < .001 && (n = 0), Math.abs(i) < .001 && (i = 0), Math.abs(e) < .001 && (e = 0), Math.abs(t) < .001 && (t = 0), Math.abs(r) < .001 && (r = 0);
          var v = `translate3d(${a}px,${n}px,${i}px)  rotateX(${t}deg) rotateY(${e}deg) scale(${r})`;
          if (O(h, y).transform(v), y[0].style.zIndex = 1 - Math.abs(Math.round(b)), h.slideShadows) {
            let e = p ? y.find(".swiper-slide-shadow-left") : y.find(".swiper-slide-shadow-top"),
              t = p ? y.find(".swiper-slide-shadow-right") : y.find(".swiper-slide-shadow-bottom");
            0 === e.length && (e = z(h, y, p ? "left" : "top")), 0 === t.length && (t = z(h, y, p ? "right" : "bottom")), e.length && (e[0].style.opacity = 0 < b ? b : 0), t.length && (t[0].style.opacity = 0 < -b ? -b : 0)
          }
        }
      },
      setTransition: e => {
        var t = y.params.coverflowEffect["transformEl"];
        (t ? y.slides.find(t) : y.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
      },
      perspective: () => !0,
      overwriteParams: () => ({
        watchSlidesProgress: !0
      })
    })
  }, function (e) {
    let {
      swiper: b,
      extendParams: t,
      on: i
    } = e;
    t({
      creativeEffect: {
        transformEl: null,
        limitProgress: 1,
        shadowPerProgress: !1,
        progressMultiplier: 1,
        perspective: !0,
        prev: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        },
        next: {
          translate: [0, 0, 0],
          rotate: [0, 0, 0],
          opacity: 1,
          scale: 1
        }
      }
    });
    A({
      effect: "creative",
      swiper: b,
      on: i,
      setTranslate: () => {
        const {
          slides: n,
          $wrapperEl: e,
          slidesSizesGrid: a
        } = b, r = b.params.creativeEffect, o = r["progressMultiplier"], l = b.params.centeredSlides;
        if (l) {
          const n = a[0] / 2 - b.params.slidesOffsetBefore || 0;
          e.transform(`translateX(calc(50% - ${n}px))`)
        }
        for (let s = 0; s < n.length; s += 1) {
          const a = n.eq(s),
            u = a[0].progress,
            f = Math.min(Math.max(a[0].progress, -r.limitProgress), r.limitProgress);
          let e = f;
          l || (e = Math.min(Math.max(a[0].originalProgress, -r.limitProgress), r.limitProgress));
          const m = a[0].swiperSlideOffset,
            g = [b.params.cssMode ? -m - b.translate : -m, 0, 0],
            v = [0, 0, 0];
          let t = !1,
            i = (b.isHorizontal() || (g[1] = g[0], g[0] = 0), {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              scale: 1,
              opacity: 1
            });
          f < 0 ? (i = r.next, t = !0) : 0 < f && (i = r.prev, t = !0), g.forEach((e, t) => {
            g[t] = `calc(${e}px + (${e=i.translate[t],"string"==typeof e?e:e+"px"} * ${Math.abs(f*o)}))`
          }), v.forEach((e, t) => {
            v[t] = i.rotate[t] * Math.abs(f * o)
          }), a[0].style.zIndex = -Math.abs(Math.round(u)) + n.length;
          var d = g.join(", "),
            c = `rotateX(${v[0]}deg) rotateY(${v[1]}deg) rotateZ(${v[2]}deg)`,
            h = e < 0 ? `scale(${1+(1-i.scale)*e*o})` : `scale(${1-(1-i.scale)*e*o})`,
            p = e < 0 ? 1 + (1 - i.opacity) * e * o : 1 - (1 - i.opacity) * e * o,
            d = `translate3d(${d}) ${c} ` + h;
          if (t && i.shadow || !t) {
            let e = a.children(".swiper-slide-shadow");
            if ((e = 0 === e.length && i.shadow ? z(r, a) : e).length) {
              const b = r.shadowPerProgress ? f * (1 / r.limitProgress) : f;
              e[0].style.opacity = Math.min(Math.max(Math.abs(b), 0), 1)
            }
          }
          c = O(r, a);
          c.transform(d).css({
            opacity: p
          }), i.origin && c.css("transform-origin", i.origin)
        }
      },
      setTransition: e => {
        var t = b.params.creativeEffect["transformEl"];
        (t ? b.slides.find(t) : b.slides).transition(e).find(".swiper-slide-shadow").transition(e), I({
          swiper: b,
          duration: e,
          transformEl: t,
          allSlides: !0
        })
      },
      perspective: () => b.params.creativeEffect.perspective,
      overwriteParams: () => ({
        watchSlidesProgress: !0,
        virtualTranslate: !b.params.cssMode
      })
    })
  }, function (e) {
    let {
      swiper: y,
      extendParams: t,
      on: i
    } = e;
    t({
      cardsEffect: {
        slideShadows: !0,
        transformEl: null,
        rotate: !0,
        perSlideRotate: 2,
        perSlideOffset: 8
      }
    }), A({
      effect: "cards",
      swiper: y,
      on: i,
      setTranslate: () => {
        const {
          slides: o,
          activeIndex: l
        } = y, d = y.params.cardsEffect, {
          startTranslate: c,
          isTouched: h
        } = y.touchEventsData, p = y.translate;
        for (let r = 0; r < o.length; r += 1) {
          var u = o.eq(r),
            f = u[0].progress,
            m = Math.min(Math.max(f, -4), 4);
          let e = u[0].swiperSlideOffset,
            t = (y.params.centeredSlides && !y.params.cssMode && y.$wrapperEl.transform(`translateX(${y.minTranslate()}px)`), y.params.centeredSlides && y.params.cssMode && (e -= o[0].swiperSlideOffset), y.params.cssMode ? -e - y.translate : -e),
            i = 0;
          var g = -100 * Math.abs(m);
          let s = 1,
            n = -d.perSlideRotate * m,
            a = d.perSlideOffset - .75 * Math.abs(m);
          var v = y.virtual && y.params.virtual.enabled ? y.virtual.from + r : r,
            b = (v === l || v === l - 1) && 0 < m && m < 1 && (h || y.params.cssMode) && p < c,
            v = (v === l || v === l + 1) && m < 0 && -1 < m && (h || y.params.cssMode) && c < p;
          if (b || v) {
            const o = (1 - Math.abs((Math.abs(m) - .5) / .5)) ** .5;
            n += -28 * m * o, s += -.5 * o, a += 96 * o, i = -25 * o * Math.abs(m) + "%"
          }
          if (t = m < 0 ? `calc(${t}px + (${a*Math.abs(m)}%))` : 0 < m ? `calc(${t}px + (-${a*Math.abs(m)}%))` : t + "px", !y.isHorizontal()) {
            const o = i;
            i = t, t = o
          }
          b = m < 0 ? "" + (1 + (1 - s) * m) : "" + (1 - (1 - s) * m), v = `
        translate3d(${t}, ${i}, ${g}px)
        rotateZ(${d.rotate?n:0}deg)
        scale(${b})
      `;
          if (d.slideShadows) {
            let e = u.find(".swiper-slide-shadow");
            (e = 0 === e.length ? z(d, u) : e).length && (e[0].style.opacity = Math.min(Math.max((Math.abs(m) - .5) / .5, 0), 1))
          }
          u[0].style.zIndex = -Math.abs(Math.round(f)) + o.length, O(d, u).transform(v)
        }
      },
      setTransition: e => {
        var t = y.params.cardsEffect["transformEl"];
        (t ? y.slides.find(t) : y.slides).transition(e).find(".swiper-slide-shadow").transition(e), I({
          swiper: y,
          duration: e,
          transformEl: t
        })
      },
      perspective: () => !0,
      overwriteParams: () => ({
        watchSlidesProgress: !0,
        virtualTranslate: !y.params.cssMode
      })
    })
  }]), E
});