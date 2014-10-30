// Compiled by ClojureScript 0.0-2234
goog.provide('dommy.core');
goog.require('cljs.core');
goog.require('dommy.utils');
goog.require('dommy.utils');
goog.require('dommy.utils');
goog.require('clojure.string');
goog.require('clojure.string');
/**
* Returns a selector in string format.
* Accepts string, keyword, or collection.
*/
dommy.core.selector = (function selector(data){if(cljs.core.coll_QMARK_.call(null,data))
{return clojure.string.join.call(null," ",cljs.core.map.call(null,selector,data));
} else
{if((typeof data === 'string') || ((data instanceof cljs.core.Keyword)))
{return cljs.core.name.call(null,data);
} else
{return null;
}
}
});
dommy.core.text = (function text(elem){var or__3559__auto__ = elem.textContent;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return elem.innerText;
}
});
dommy.core.html = (function html(elem){return elem.innerHTML;
});
dommy.core.value = (function value(elem){return elem.value;
});
dommy.core.class$ = (function class$(elem){return elem.className;
});
dommy.core.attr = (function attr(elem,k){if(cljs.core.truth_(k))
{return elem.getAttribute(dommy.utils.as_str.call(null,k));
} else
{return null;
}
});
/**
* The computed style of `elem`, optionally specifying the key of
* a particular style to return
*/
dommy.core.style = (function() {
var style = null;
var style__1 = (function (elem){return cljs.core.js__GT_clj.call(null,window.getComputedStyle(elem));
});
var style__2 = (function (elem,k){return (window.getComputedStyle(elem)[dommy.utils.as_str.call(null,k)]);
});
style = function(elem,k){
switch(arguments.length){
case 1:
return style__1.call(this,elem);
case 2:
return style__2.call(this,elem,k);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
style.cljs$core$IFn$_invoke$arity$1 = style__1;
style.cljs$core$IFn$_invoke$arity$2 = style__2;
return style;
})()
;
dommy.core.px = (function px(elem,k){var pixels = dommy.core.style.call(null,elem,k);if(cljs.core.seq.call(null,pixels))
{return parseInt(pixels);
} else
{return null;
}
});
/**
* Does `elem` contain `c` in its class list
*/
dommy.core.has_class_QMARK_ = (function has_class_QMARK_(elem,c){var c__$1 = dommy.utils.as_str.call(null,c);var temp__4124__auto__ = elem.classList;if(cljs.core.truth_(temp__4124__auto__))
{var class_list = temp__4124__auto__;return class_list.contains(c__$1);
} else
{var temp__4126__auto__ = dommy.core.class$.call(null,elem);if(cljs.core.truth_(temp__4126__auto__))
{var class_name = temp__4126__auto__;var temp__4126__auto____$1 = dommy.utils.class_index.call(null,class_name,c__$1);if(cljs.core.truth_(temp__4126__auto____$1))
{var i = temp__4126__auto____$1;return (i >= 0);
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Is `elem` hidden (as associated with hide!/show!/toggle!, using display: none)
*/
dommy.core.hidden_QMARK_ = (function hidden_QMARK_(elem){return (dommy.core.style.call(null,elem,new cljs.core.Keyword(null,"display","display",2685668404)) === "none");
});
/**
* Returns a map of the bounding client rect of `elem`
* as a map with [:top :left :right :bottom :width :height]
*/
dommy.core.bounding_client_rect = (function bounding_client_rect(elem){var r = elem.getBoundingClientRect();return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"top","top",1014019271),r.top,new cljs.core.Keyword(null,"bottom","bottom",3925642653),r.bottom,new cljs.core.Keyword(null,"left","left",1017222009),r.left,new cljs.core.Keyword(null,"right","right",1122416014),r.right,new cljs.core.Keyword(null,"width","width",1127031096),r.width,new cljs.core.Keyword(null,"height","height",4087841945),r.height], null);
});
dommy.core.parent = (function parent(elem){return elem.parentNode;
});
dommy.core.children = (function children(elem){return elem.children;
});
/**
* Lazy seq of the ancestors of `elem`
*/
dommy.core.ancestors = (function ancestors(elem){return cljs.core.take_while.call(null,cljs.core.identity,cljs.core.iterate.call(null,dommy.core.parent,elem));
});
dommy.core.ancestor_nodes = dommy.core.ancestors;
/**
* Returns a predicate on nodes that match `selector` at the
* time of this `matches-pred` call (may return outdated results
* if you fuck with the DOM)
*/
dommy.core.matches_pred = (function() {
var matches_pred = null;
var matches_pred__1 = (function (selector){return matches_pred.call(null,document,selector);
});
var matches_pred__2 = (function (base,selector){var matches = dommy.utils.__GT_Array.call(null,base.querySelectorAll(dommy.core.selector.call(null,selector)));return ((function (matches){
return (function (elem){return (matches.indexOf(elem) >= 0);
});
;})(matches))
});
matches_pred = function(base,selector){
switch(arguments.length){
case 1:
return matches_pred__1.call(this,base);
case 2:
return matches_pred__2.call(this,base,selector);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
matches_pred.cljs$core$IFn$_invoke$arity$1 = matches_pred__1;
matches_pred.cljs$core$IFn$_invoke$arity$2 = matches_pred__2;
return matches_pred;
})()
;
/**
* Closest ancestor of `elem` (up to `base`, if provided)
* that matches `selector`
*/
dommy.core.closest = (function() {
var closest = null;
var closest__2 = (function (elem,selector){return closest.call(null,document.body,elem,selector);
});
var closest__3 = (function (base,elem,selector){return cljs.core.first.call(null,cljs.core.filter.call(null,dommy.core.matches_pred.call(null,base,selector),cljs.core.take_while.call(null,(function (p1__6882_SHARP_){return !((p1__6882_SHARP_ === base));
}),dommy.core.ancestors.call(null,elem))));
});
closest = function(base,elem,selector){
switch(arguments.length){
case 2:
return closest__2.call(this,base,elem);
case 3:
return closest__3.call(this,base,elem,selector);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
closest.cljs$core$IFn$_invoke$arity$2 = closest__2;
closest.cljs$core$IFn$_invoke$arity$3 = closest__3;
return closest;
})()
;
/**
* Is `descendant` a descendant of `ancestor`?
* (http://goo.gl/T8pgCX)
*/
dommy.core.descendant_QMARK_ = (function descendant_QMARK_(descendant,ancestor){if(cljs.core.truth_(ancestor.contains))
{return ancestor.contains(descendant);
} else
{if(cljs.core.truth_(ancestor.compareDocumentPosition))
{return ((ancestor.compareDocumentPosition(descendant) & (1 << 4)) != 0);
} else
{return null;
}
}
});
/**
* Set the textContent of `elem` to `text`, fall back to innerText
*/
dommy.core.set_text_BANG_ = (function set_text_BANG_(elem,text){if(!((void 0 === elem.textContent)))
{elem.textContent = text;
} else
{elem.innerText = text;
}
return elem;
});
/**
* Set the innerHTML of `elem` to `html`
*/
dommy.core.set_html_BANG_ = (function set_html_BANG_(elem,html){elem.innerHTML = html;
return elem;
});
/**
* Set the value of `elem` to `value`
*/
dommy.core.set_value_BANG_ = (function set_value_BANG_(elem,value){elem.value = value;
return elem;
});
/**
* Set the css class of `elem` to `elem`
*/
dommy.core.set_class_BANG_ = (function set_class_BANG_(elem,c){return elem.className = c;
});
/**
* Set the style of `elem` using key-value pairs:
* 
* (set-style! elem :display "block" :color "red")
* @param {...*} var_args
*/
dommy.core.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (elem,kvs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,kvs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"kvs","kvs",-1640424927,null))))))));
}
var style = elem.style;var seq__6889_6895 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,kvs));var chunk__6890_6896 = null;var count__6891_6897 = 0;var i__6892_6898 = 0;while(true){
if((i__6892_6898 < count__6891_6897))
{var vec__6893_6899 = cljs.core._nth.call(null,chunk__6890_6896,i__6892_6898);var k_6900 = cljs.core.nth.call(null,vec__6893_6899,0,null);var v_6901 = cljs.core.nth.call(null,vec__6893_6899,1,null);style.setProperty(dommy.utils.as_str.call(null,k_6900),v_6901);
{
var G__6902 = seq__6889_6895;
var G__6903 = chunk__6890_6896;
var G__6904 = count__6891_6897;
var G__6905 = (i__6892_6898 + 1);
seq__6889_6895 = G__6902;
chunk__6890_6896 = G__6903;
count__6891_6897 = G__6904;
i__6892_6898 = G__6905;
continue;
}
} else
{var temp__4126__auto___6906 = cljs.core.seq.call(null,seq__6889_6895);if(temp__4126__auto___6906)
{var seq__6889_6907__$1 = temp__4126__auto___6906;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6889_6907__$1))
{var c__4315__auto___6908 = cljs.core.chunk_first.call(null,seq__6889_6907__$1);{
var G__6909 = cljs.core.chunk_rest.call(null,seq__6889_6907__$1);
var G__6910 = c__4315__auto___6908;
var G__6911 = cljs.core.count.call(null,c__4315__auto___6908);
var G__6912 = 0;
seq__6889_6895 = G__6909;
chunk__6890_6896 = G__6910;
count__6891_6897 = G__6911;
i__6892_6898 = G__6912;
continue;
}
} else
{var vec__6894_6913 = cljs.core.first.call(null,seq__6889_6907__$1);var k_6914 = cljs.core.nth.call(null,vec__6894_6913,0,null);var v_6915 = cljs.core.nth.call(null,vec__6894_6913,1,null);style.setProperty(dommy.utils.as_str.call(null,k_6914),v_6915);
{
var G__6916 = cljs.core.next.call(null,seq__6889_6907__$1);
var G__6917 = null;
var G__6918 = 0;
var G__6919 = 0;
seq__6889_6895 = G__6916;
chunk__6890_6896 = G__6917;
count__6891_6897 = G__6918;
i__6892_6898 = G__6919;
continue;
}
}
} else
{}
}
break;
}
return elem;
};
var set_style_BANG_ = function (elem,var_args){
var kvs = null;if (arguments.length > 1) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return set_style_BANG___delegate.call(this,elem,kvs);};
set_style_BANG_.cljs$lang$maxFixedArity = 1;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__6920){
var elem = cljs.core.first(arglist__6920);
var kvs = cljs.core.rest(arglist__6920);
return set_style_BANG___delegate(elem,kvs);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
/**
* @param {...*} var_args
*/
dommy.core.set_px_BANG_ = (function() { 
var set_px_BANG___delegate = function (elem,kvs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,kvs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"kvs","kvs",-1640424927,null))))))));
}
var seq__6927_6933 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,kvs));var chunk__6928_6934 = null;var count__6929_6935 = 0;var i__6930_6936 = 0;while(true){
if((i__6930_6936 < count__6929_6935))
{var vec__6931_6937 = cljs.core._nth.call(null,chunk__6928_6934,i__6930_6936);var k_6938 = cljs.core.nth.call(null,vec__6931_6937,0,null);var v_6939 = cljs.core.nth.call(null,vec__6931_6937,1,null);dommy.core.set_style_BANG_.call(null,elem,k_6938,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v_6939)+"px"));
{
var G__6940 = seq__6927_6933;
var G__6941 = chunk__6928_6934;
var G__6942 = count__6929_6935;
var G__6943 = (i__6930_6936 + 1);
seq__6927_6933 = G__6940;
chunk__6928_6934 = G__6941;
count__6929_6935 = G__6942;
i__6930_6936 = G__6943;
continue;
}
} else
{var temp__4126__auto___6944 = cljs.core.seq.call(null,seq__6927_6933);if(temp__4126__auto___6944)
{var seq__6927_6945__$1 = temp__4126__auto___6944;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6927_6945__$1))
{var c__4315__auto___6946 = cljs.core.chunk_first.call(null,seq__6927_6945__$1);{
var G__6947 = cljs.core.chunk_rest.call(null,seq__6927_6945__$1);
var G__6948 = c__4315__auto___6946;
var G__6949 = cljs.core.count.call(null,c__4315__auto___6946);
var G__6950 = 0;
seq__6927_6933 = G__6947;
chunk__6928_6934 = G__6948;
count__6929_6935 = G__6949;
i__6930_6936 = G__6950;
continue;
}
} else
{var vec__6932_6951 = cljs.core.first.call(null,seq__6927_6945__$1);var k_6952 = cljs.core.nth.call(null,vec__6932_6951,0,null);var v_6953 = cljs.core.nth.call(null,vec__6932_6951,1,null);dommy.core.set_style_BANG_.call(null,elem,k_6952,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(v_6953)+"px"));
{
var G__6954 = cljs.core.next.call(null,seq__6927_6945__$1);
var G__6955 = null;
var G__6956 = 0;
var G__6957 = 0;
seq__6927_6933 = G__6954;
chunk__6928_6934 = G__6955;
count__6929_6935 = G__6956;
i__6930_6936 = G__6957;
continue;
}
}
} else
{}
}
break;
}
return elem;
};
var set_px_BANG_ = function (elem,var_args){
var kvs = null;if (arguments.length > 1) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return set_px_BANG___delegate.call(this,elem,kvs);};
set_px_BANG_.cljs$lang$maxFixedArity = 1;
set_px_BANG_.cljs$lang$applyTo = (function (arglist__6958){
var elem = cljs.core.first(arglist__6958);
var kvs = cljs.core.rest(arglist__6958);
return set_px_BANG___delegate(elem,kvs);
});
set_px_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_px_BANG___delegate;
return set_px_BANG_;
})()
;
/**
* Sets dom attributes on and returns `elem`.
* Attributes without values will be set to "true":
* 
* (set-attr! elem :disabled)
* 
* With values, the function takes variadic kv pairs:
* 
* (set-attr! elem :id "some-id"
* :name "some-name")
* @param {...*} var_args
*/
dommy.core.set_attr_BANG_ = (function() {
var set_attr_BANG_ = null;
var set_attr_BANG___2 = (function (elem,k){return set_attr_BANG_.call(null,elem,k,"true");
});
var set_attr_BANG___3 = (function (elem,k,v){var k__$1 = dommy.utils.as_str.call(null,k);if(cljs.core.truth_(v))
{if(cljs.core.fn_QMARK_.call(null,v))
{var G__6967 = elem;(G__6967[k__$1] = v);
return G__6967;
} else
{var G__6968 = elem;G__6968.setAttribute(k__$1,v);
return G__6968;
}
} else
{return null;
}
});
var set_attr_BANG___4 = (function() { 
var G__6975__delegate = function (elem,k,v,kvs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,kvs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"kvs","kvs",-1640424927,null))))))));
}
var seq__6969_6976 = cljs.core.seq.call(null,cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null),cljs.core.partition.call(null,2,kvs)));var chunk__6970_6977 = null;var count__6971_6978 = 0;var i__6972_6979 = 0;while(true){
if((i__6972_6979 < count__6971_6978))
{var vec__6973_6980 = cljs.core._nth.call(null,chunk__6970_6977,i__6972_6979);var k_6981__$1 = cljs.core.nth.call(null,vec__6973_6980,0,null);var v_6982__$1 = cljs.core.nth.call(null,vec__6973_6980,1,null);set_attr_BANG_.call(null,elem,k_6981__$1,v_6982__$1);
{
var G__6983 = seq__6969_6976;
var G__6984 = chunk__6970_6977;
var G__6985 = count__6971_6978;
var G__6986 = (i__6972_6979 + 1);
seq__6969_6976 = G__6983;
chunk__6970_6977 = G__6984;
count__6971_6978 = G__6985;
i__6972_6979 = G__6986;
continue;
}
} else
{var temp__4126__auto___6987 = cljs.core.seq.call(null,seq__6969_6976);if(temp__4126__auto___6987)
{var seq__6969_6988__$1 = temp__4126__auto___6987;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6969_6988__$1))
{var c__4315__auto___6989 = cljs.core.chunk_first.call(null,seq__6969_6988__$1);{
var G__6990 = cljs.core.chunk_rest.call(null,seq__6969_6988__$1);
var G__6991 = c__4315__auto___6989;
var G__6992 = cljs.core.count.call(null,c__4315__auto___6989);
var G__6993 = 0;
seq__6969_6976 = G__6990;
chunk__6970_6977 = G__6991;
count__6971_6978 = G__6992;
i__6972_6979 = G__6993;
continue;
}
} else
{var vec__6974_6994 = cljs.core.first.call(null,seq__6969_6988__$1);var k_6995__$1 = cljs.core.nth.call(null,vec__6974_6994,0,null);var v_6996__$1 = cljs.core.nth.call(null,vec__6974_6994,1,null);set_attr_BANG_.call(null,elem,k_6995__$1,v_6996__$1);
{
var G__6997 = cljs.core.next.call(null,seq__6969_6988__$1);
var G__6998 = null;
var G__6999 = 0;
var G__7000 = 0;
seq__6969_6976 = G__6997;
chunk__6970_6977 = G__6998;
count__6971_6978 = G__6999;
i__6972_6979 = G__7000;
continue;
}
}
} else
{}
}
break;
}
return elem;
};
var G__6975 = function (elem,k,v,var_args){
var kvs = null;if (arguments.length > 3) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);} 
return G__6975__delegate.call(this,elem,k,v,kvs);};
G__6975.cljs$lang$maxFixedArity = 3;
G__6975.cljs$lang$applyTo = (function (arglist__7001){
var elem = cljs.core.first(arglist__7001);
arglist__7001 = cljs.core.next(arglist__7001);
var k = cljs.core.first(arglist__7001);
arglist__7001 = cljs.core.next(arglist__7001);
var v = cljs.core.first(arglist__7001);
var kvs = cljs.core.rest(arglist__7001);
return G__6975__delegate(elem,k,v,kvs);
});
G__6975.cljs$core$IFn$_invoke$arity$variadic = G__6975__delegate;
return G__6975;
})()
;
set_attr_BANG_ = function(elem,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case 2:
return set_attr_BANG___2.call(this,elem,k);
case 3:
return set_attr_BANG___3.call(this,elem,k,v);
default:
return set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic(elem,k,v, cljs.core.array_seq(arguments, 3));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
set_attr_BANG_.cljs$lang$maxFixedArity = 3;
set_attr_BANG_.cljs$lang$applyTo = set_attr_BANG___4.cljs$lang$applyTo;
set_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = set_attr_BANG___2;
set_attr_BANG_.cljs$core$IFn$_invoke$arity$3 = set_attr_BANG___3;
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___4.cljs$core$IFn$_invoke$arity$variadic;
return set_attr_BANG_;
})()
;
/**
* Removes dom attributes on and returns `elem`.
* `class` and `classes` are special cases which clear
* out the class name on removal.
* @param {...*} var_args
*/
dommy.core.remove_attr_BANG_ = (function() {
var remove_attr_BANG_ = null;
var remove_attr_BANG___2 = (function (elem,k){var k_7010__$1 = dommy.utils.as_str.call(null,k);if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["class",null,"classes",null], null), null).call(null,k_7010__$1)))
{dommy.core.set_class_BANG_.call(null,elem,"");
} else
{elem.removeAttribute(k_7010__$1);
}
return elem;
});
var remove_attr_BANG___3 = (function() { 
var G__7011__delegate = function (elem,k,ks){var seq__7006_7012 = cljs.core.seq.call(null,cljs.core.cons.call(null,k,ks));var chunk__7007_7013 = null;var count__7008_7014 = 0;var i__7009_7015 = 0;while(true){
if((i__7009_7015 < count__7008_7014))
{var k_7016__$1 = cljs.core._nth.call(null,chunk__7007_7013,i__7009_7015);remove_attr_BANG_.call(null,elem,k_7016__$1);
{
var G__7017 = seq__7006_7012;
var G__7018 = chunk__7007_7013;
var G__7019 = count__7008_7014;
var G__7020 = (i__7009_7015 + 1);
seq__7006_7012 = G__7017;
chunk__7007_7013 = G__7018;
count__7008_7014 = G__7019;
i__7009_7015 = G__7020;
continue;
}
} else
{var temp__4126__auto___7021 = cljs.core.seq.call(null,seq__7006_7012);if(temp__4126__auto___7021)
{var seq__7006_7022__$1 = temp__4126__auto___7021;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7006_7022__$1))
{var c__4315__auto___7023 = cljs.core.chunk_first.call(null,seq__7006_7022__$1);{
var G__7024 = cljs.core.chunk_rest.call(null,seq__7006_7022__$1);
var G__7025 = c__4315__auto___7023;
var G__7026 = cljs.core.count.call(null,c__4315__auto___7023);
var G__7027 = 0;
seq__7006_7012 = G__7024;
chunk__7007_7013 = G__7025;
count__7008_7014 = G__7026;
i__7009_7015 = G__7027;
continue;
}
} else
{var k_7028__$1 = cljs.core.first.call(null,seq__7006_7022__$1);remove_attr_BANG_.call(null,elem,k_7028__$1);
{
var G__7029 = cljs.core.next.call(null,seq__7006_7022__$1);
var G__7030 = null;
var G__7031 = 0;
var G__7032 = 0;
seq__7006_7012 = G__7029;
chunk__7007_7013 = G__7030;
count__7008_7014 = G__7031;
i__7009_7015 = G__7032;
continue;
}
}
} else
{}
}
break;
}
return elem;
};
var G__7011 = function (elem,k,var_args){
var ks = null;if (arguments.length > 2) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__7011__delegate.call(this,elem,k,ks);};
G__7011.cljs$lang$maxFixedArity = 2;
G__7011.cljs$lang$applyTo = (function (arglist__7033){
var elem = cljs.core.first(arglist__7033);
arglist__7033 = cljs.core.next(arglist__7033);
var k = cljs.core.first(arglist__7033);
var ks = cljs.core.rest(arglist__7033);
return G__7011__delegate(elem,k,ks);
});
G__7011.cljs$core$IFn$_invoke$arity$variadic = G__7011__delegate;
return G__7011;
})()
;
remove_attr_BANG_ = function(elem,k,var_args){
var ks = var_args;
switch(arguments.length){
case 2:
return remove_attr_BANG___2.call(this,elem,k);
default:
return remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,k, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_attr_BANG_.cljs$lang$maxFixedArity = 2;
remove_attr_BANG_.cljs$lang$applyTo = remove_attr_BANG___3.cljs$lang$applyTo;
remove_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = remove_attr_BANG___2;
remove_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = remove_attr_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return remove_attr_BANG_;
})()
;
/**
* Toggles a dom attribute `k` on `elem`, optionally specifying
* the boolean value with `add?`
*/
dommy.core.toggle_attr_BANG_ = (function() {
var toggle_attr_BANG_ = null;
var toggle_attr_BANG___2 = (function (elem,k){return toggle_attr_BANG_.call(null,elem,k,cljs.core.boolean$.call(null,dommy.core.attr.call(null,elem,k)));
});
var toggle_attr_BANG___3 = (function (elem,k,add_QMARK_){if(add_QMARK_)
{return dommy.core.set_attr_BANG_.call(null,elem,k);
} else
{return dommy.core.remove_attr_BANG_.call(null,elem,k);
}
});
toggle_attr_BANG_ = function(elem,k,add_QMARK_){
switch(arguments.length){
case 2:
return toggle_attr_BANG___2.call(this,elem,k);
case 3:
return toggle_attr_BANG___3.call(this,elem,k,add_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$2 = toggle_attr_BANG___2;
toggle_attr_BANG_.cljs$core$IFn$_invoke$arity$3 = toggle_attr_BANG___3;
return toggle_attr_BANG_;
})()
;
/**
* Add `classes` to `elem`, trying to use Element::classList, and
* falling back to fast string parsing/manipulation
* @param {...*} var_args
*/
dommy.core.add_class_BANG_ = (function() {
var add_class_BANG_ = null;
var add_class_BANG___2 = (function (elem,classes){var classes__$1 = clojure.string.trim.call(null,dommy.utils.as_str.call(null,classes)).split(/\s+/);if(cljs.core.seq.call(null,classes__$1))
{var temp__4124__auto___7058 = elem.classList;if(cljs.core.truth_(temp__4124__auto___7058))
{var class_list_7059 = temp__4124__auto___7058;var seq__7046_7060 = cljs.core.seq.call(null,classes__$1);var chunk__7047_7061 = null;var count__7048_7062 = 0;var i__7049_7063 = 0;while(true){
if((i__7049_7063 < count__7048_7062))
{var c_7064 = cljs.core._nth.call(null,chunk__7047_7061,i__7049_7063);class_list_7059.add(c_7064);
{
var G__7065 = seq__7046_7060;
var G__7066 = chunk__7047_7061;
var G__7067 = count__7048_7062;
var G__7068 = (i__7049_7063 + 1);
seq__7046_7060 = G__7065;
chunk__7047_7061 = G__7066;
count__7048_7062 = G__7067;
i__7049_7063 = G__7068;
continue;
}
} else
{var temp__4126__auto___7069 = cljs.core.seq.call(null,seq__7046_7060);if(temp__4126__auto___7069)
{var seq__7046_7070__$1 = temp__4126__auto___7069;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7046_7070__$1))
{var c__4315__auto___7071 = cljs.core.chunk_first.call(null,seq__7046_7070__$1);{
var G__7072 = cljs.core.chunk_rest.call(null,seq__7046_7070__$1);
var G__7073 = c__4315__auto___7071;
var G__7074 = cljs.core.count.call(null,c__4315__auto___7071);
var G__7075 = 0;
seq__7046_7060 = G__7072;
chunk__7047_7061 = G__7073;
count__7048_7062 = G__7074;
i__7049_7063 = G__7075;
continue;
}
} else
{var c_7076 = cljs.core.first.call(null,seq__7046_7070__$1);class_list_7059.add(c_7076);
{
var G__7077 = cljs.core.next.call(null,seq__7046_7070__$1);
var G__7078 = null;
var G__7079 = 0;
var G__7080 = 0;
seq__7046_7060 = G__7077;
chunk__7047_7061 = G__7078;
count__7048_7062 = G__7079;
i__7049_7063 = G__7080;
continue;
}
}
} else
{}
}
break;
}
} else
{var seq__7050_7081 = cljs.core.seq.call(null,classes__$1);var chunk__7051_7082 = null;var count__7052_7083 = 0;var i__7053_7084 = 0;while(true){
if((i__7053_7084 < count__7052_7083))
{var c_7085 = cljs.core._nth.call(null,chunk__7051_7082,i__7053_7084);var class_name_7086 = dommy.core.class$.call(null,elem);if(cljs.core.truth_(dommy.utils.class_index.call(null,class_name_7086,c_7085)))
{} else
{dommy.core.set_class_BANG_.call(null,elem,(((class_name_7086 === ""))?c_7085:(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_name_7086)+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c_7085))));
}
{
var G__7087 = seq__7050_7081;
var G__7088 = chunk__7051_7082;
var G__7089 = count__7052_7083;
var G__7090 = (i__7053_7084 + 1);
seq__7050_7081 = G__7087;
chunk__7051_7082 = G__7088;
count__7052_7083 = G__7089;
i__7053_7084 = G__7090;
continue;
}
} else
{var temp__4126__auto___7091 = cljs.core.seq.call(null,seq__7050_7081);if(temp__4126__auto___7091)
{var seq__7050_7092__$1 = temp__4126__auto___7091;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7050_7092__$1))
{var c__4315__auto___7093 = cljs.core.chunk_first.call(null,seq__7050_7092__$1);{
var G__7094 = cljs.core.chunk_rest.call(null,seq__7050_7092__$1);
var G__7095 = c__4315__auto___7093;
var G__7096 = cljs.core.count.call(null,c__4315__auto___7093);
var G__7097 = 0;
seq__7050_7081 = G__7094;
chunk__7051_7082 = G__7095;
count__7052_7083 = G__7096;
i__7053_7084 = G__7097;
continue;
}
} else
{var c_7098 = cljs.core.first.call(null,seq__7050_7092__$1);var class_name_7099 = dommy.core.class$.call(null,elem);if(cljs.core.truth_(dommy.utils.class_index.call(null,class_name_7099,c_7098)))
{} else
{dommy.core.set_class_BANG_.call(null,elem,(((class_name_7099 === ""))?c_7098:(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(class_name_7099)+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c_7098))));
}
{
var G__7100 = cljs.core.next.call(null,seq__7050_7092__$1);
var G__7101 = null;
var G__7102 = 0;
var G__7103 = 0;
seq__7050_7081 = G__7100;
chunk__7051_7082 = G__7101;
count__7052_7083 = G__7102;
i__7053_7084 = G__7103;
continue;
}
}
} else
{}
}
break;
}
}
} else
{}
return elem;
});
var add_class_BANG___3 = (function() { 
var G__7104__delegate = function (elem,classes,more_classes){var seq__7054_7105 = cljs.core.seq.call(null,cljs.core.conj.call(null,more_classes,classes));var chunk__7055_7106 = null;var count__7056_7107 = 0;var i__7057_7108 = 0;while(true){
if((i__7057_7108 < count__7056_7107))
{var c_7109 = cljs.core._nth.call(null,chunk__7055_7106,i__7057_7108);add_class_BANG_.call(null,elem,c_7109);
{
var G__7110 = seq__7054_7105;
var G__7111 = chunk__7055_7106;
var G__7112 = count__7056_7107;
var G__7113 = (i__7057_7108 + 1);
seq__7054_7105 = G__7110;
chunk__7055_7106 = G__7111;
count__7056_7107 = G__7112;
i__7057_7108 = G__7113;
continue;
}
} else
{var temp__4126__auto___7114 = cljs.core.seq.call(null,seq__7054_7105);if(temp__4126__auto___7114)
{var seq__7054_7115__$1 = temp__4126__auto___7114;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7054_7115__$1))
{var c__4315__auto___7116 = cljs.core.chunk_first.call(null,seq__7054_7115__$1);{
var G__7117 = cljs.core.chunk_rest.call(null,seq__7054_7115__$1);
var G__7118 = c__4315__auto___7116;
var G__7119 = cljs.core.count.call(null,c__4315__auto___7116);
var G__7120 = 0;
seq__7054_7105 = G__7117;
chunk__7055_7106 = G__7118;
count__7056_7107 = G__7119;
i__7057_7108 = G__7120;
continue;
}
} else
{var c_7121 = cljs.core.first.call(null,seq__7054_7115__$1);add_class_BANG_.call(null,elem,c_7121);
{
var G__7122 = cljs.core.next.call(null,seq__7054_7115__$1);
var G__7123 = null;
var G__7124 = 0;
var G__7125 = 0;
seq__7054_7105 = G__7122;
chunk__7055_7106 = G__7123;
count__7056_7107 = G__7124;
i__7057_7108 = G__7125;
continue;
}
}
} else
{}
}
break;
}
return elem;
};
var G__7104 = function (elem,classes,var_args){
var more_classes = null;if (arguments.length > 2) {
  more_classes = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__7104__delegate.call(this,elem,classes,more_classes);};
G__7104.cljs$lang$maxFixedArity = 2;
G__7104.cljs$lang$applyTo = (function (arglist__7126){
var elem = cljs.core.first(arglist__7126);
arglist__7126 = cljs.core.next(arglist__7126);
var classes = cljs.core.first(arglist__7126);
var more_classes = cljs.core.rest(arglist__7126);
return G__7104__delegate(elem,classes,more_classes);
});
G__7104.cljs$core$IFn$_invoke$arity$variadic = G__7104__delegate;
return G__7104;
})()
;
add_class_BANG_ = function(elem,classes,var_args){
var more_classes = var_args;
switch(arguments.length){
case 2:
return add_class_BANG___2.call(this,elem,classes);
default:
return add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,classes, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
add_class_BANG_.cljs$lang$maxFixedArity = 2;
add_class_BANG_.cljs$lang$applyTo = add_class_BANG___3.cljs$lang$applyTo;
add_class_BANG_.cljs$core$IFn$_invoke$arity$2 = add_class_BANG___2;
add_class_BANG_.cljs$core$IFn$_invoke$arity$variadic = add_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return add_class_BANG_;
})()
;
/**
* Remove `c` from `elem` class list
* @param {...*} var_args
*/
dommy.core.remove_class_BANG_ = (function() {
var remove_class_BANG_ = null;
var remove_class_BANG___2 = (function (elem,c){var c__$1 = dommy.utils.as_str.call(null,c);var temp__4124__auto___7135 = elem.classList;if(cljs.core.truth_(temp__4124__auto___7135))
{var class_list_7136 = temp__4124__auto___7135;class_list_7136.remove(c__$1);
} else
{var class_name_7137 = dommy.core.class$.call(null,elem);var new_class_name_7138 = dommy.utils.remove_class_str.call(null,class_name_7137,c__$1);if((class_name_7137 === new_class_name_7138))
{} else
{dommy.core.set_class_BANG_.call(null,elem,new_class_name_7138);
}
}
return elem;
});
var remove_class_BANG___3 = (function() { 
var G__7139__delegate = function (elem,class$,classes){var seq__7131 = cljs.core.seq.call(null,cljs.core.conj.call(null,classes,class$));var chunk__7132 = null;var count__7133 = 0;var i__7134 = 0;while(true){
if((i__7134 < count__7133))
{var c = cljs.core._nth.call(null,chunk__7132,i__7134);remove_class_BANG_.call(null,elem,c);
{
var G__7140 = seq__7131;
var G__7141 = chunk__7132;
var G__7142 = count__7133;
var G__7143 = (i__7134 + 1);
seq__7131 = G__7140;
chunk__7132 = G__7141;
count__7133 = G__7142;
i__7134 = G__7143;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__7131);if(temp__4126__auto__)
{var seq__7131__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7131__$1))
{var c__4315__auto__ = cljs.core.chunk_first.call(null,seq__7131__$1);{
var G__7144 = cljs.core.chunk_rest.call(null,seq__7131__$1);
var G__7145 = c__4315__auto__;
var G__7146 = cljs.core.count.call(null,c__4315__auto__);
var G__7147 = 0;
seq__7131 = G__7144;
chunk__7132 = G__7145;
count__7133 = G__7146;
i__7134 = G__7147;
continue;
}
} else
{var c = cljs.core.first.call(null,seq__7131__$1);remove_class_BANG_.call(null,elem,c);
{
var G__7148 = cljs.core.next.call(null,seq__7131__$1);
var G__7149 = null;
var G__7150 = 0;
var G__7151 = 0;
seq__7131 = G__7148;
chunk__7132 = G__7149;
count__7133 = G__7150;
i__7134 = G__7151;
continue;
}
}
} else
{return null;
}
}
break;
}
};
var G__7139 = function (elem,class$,var_args){
var classes = null;if (arguments.length > 2) {
  classes = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__7139__delegate.call(this,elem,class$,classes);};
G__7139.cljs$lang$maxFixedArity = 2;
G__7139.cljs$lang$applyTo = (function (arglist__7152){
var elem = cljs.core.first(arglist__7152);
arglist__7152 = cljs.core.next(arglist__7152);
var class$ = cljs.core.first(arglist__7152);
var classes = cljs.core.rest(arglist__7152);
return G__7139__delegate(elem,class$,classes);
});
G__7139.cljs$core$IFn$_invoke$arity$variadic = G__7139__delegate;
return G__7139;
})()
;
remove_class_BANG_ = function(elem,class$,var_args){
var classes = var_args;
switch(arguments.length){
case 2:
return remove_class_BANG___2.call(this,elem,class$);
default:
return remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic(elem,class$, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_class_BANG_.cljs$lang$maxFixedArity = 2;
remove_class_BANG_.cljs$lang$applyTo = remove_class_BANG___3.cljs$lang$applyTo;
remove_class_BANG_.cljs$core$IFn$_invoke$arity$2 = remove_class_BANG___2;
remove_class_BANG_.cljs$core$IFn$_invoke$arity$variadic = remove_class_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return remove_class_BANG_;
})()
;
/**
* (toggle-class! elem class) will add-class! if elem does not have class
* and remove-class! otherwise.
* (toggle-class! elem class add?) will add-class! if add? is truthy,
* otherwise it will remove-class!
*/
dommy.core.toggle_class_BANG_ = (function() {
var toggle_class_BANG_ = null;
var toggle_class_BANG___2 = (function (elem,c){var c__$1 = dommy.utils.as_str.call(null,c);var temp__4124__auto___7153 = elem.classList;if(cljs.core.truth_(temp__4124__auto___7153))
{var class_list_7154 = temp__4124__auto___7153;class_list_7154.toggle(c__$1);
} else
{toggle_class_BANG_.call(null,elem,c__$1,!(dommy.core.has_class_QMARK_.call(null,elem,c__$1)));
}
return elem;
});
var toggle_class_BANG___3 = (function (elem,class$,add_QMARK_){if(add_QMARK_)
{dommy.core.add_class_BANG_.call(null,elem,class$);
} else
{dommy.core.remove_class_BANG_.call(null,elem,class$);
}
return elem;
});
toggle_class_BANG_ = function(elem,class$,add_QMARK_){
switch(arguments.length){
case 2:
return toggle_class_BANG___2.call(this,elem,class$);
case 3:
return toggle_class_BANG___3.call(this,elem,class$,add_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_class_BANG_.cljs$core$IFn$_invoke$arity$2 = toggle_class_BANG___2;
toggle_class_BANG_.cljs$core$IFn$_invoke$arity$3 = toggle_class_BANG___3;
return toggle_class_BANG_;
})()
;
/**
* Display or hide the given `elem` (using display: none).
* Takes an optional boolean `show?`
*/
dommy.core.toggle_BANG_ = (function() {
var toggle_BANG_ = null;
var toggle_BANG___1 = (function (elem){return toggle_BANG_.call(null,elem,dommy.core.hidden_QMARK_.call(null,elem));
});
var toggle_BANG___2 = (function (elem,show_QMARK_){return dommy.core.set_style_BANG_.call(null,elem,new cljs.core.Keyword(null,"display","display",2685668404),((show_QMARK_)?"":"none"));
});
toggle_BANG_ = function(elem,show_QMARK_){
switch(arguments.length){
case 1:
return toggle_BANG___1.call(this,elem);
case 2:
return toggle_BANG___2.call(this,elem,show_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
toggle_BANG_.cljs$core$IFn$_invoke$arity$1 = toggle_BANG___1;
toggle_BANG_.cljs$core$IFn$_invoke$arity$2 = toggle_BANG___2;
return toggle_BANG_;
})()
;
dommy.core.hide_BANG_ = (function hide_BANG_(elem){return dommy.core.toggle_BANG_.call(null,elem,false);
});
dommy.core.show_BANG_ = (function show_BANG_(elem){return dommy.core.toggle_BANG_.call(null,elem,true);
});
dommy.core.scroll_into_view = (function scroll_into_view(elem,align_with_top_QMARK_){var top = new cljs.core.Keyword(null,"top","top",1014019271).cljs$core$IFn$_invoke$arity$1(dommy.core.bounding_client_rect.call(null,elem));if((window.innerHeight < (top + elem.offsetHeight)))
{return elem.scrollIntoView(align_with_top_QMARK_);
} else
{return null;
}
});
dommy.core.create_element = (function() {
var create_element = null;
var create_element__1 = (function (tag){return document.createElement(dommy.utils.as_str.call(null,tag));
});
var create_element__2 = (function (tag_ns,tag){return document.createElementNS(dommy.utils.as_str.call(null,tag_ns),dommy.utils.as_str.call(null,tag));
});
create_element = function(tag_ns,tag){
switch(arguments.length){
case 1:
return create_element__1.call(this,tag_ns);
case 2:
return create_element__2.call(this,tag_ns,tag);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
create_element.cljs$core$IFn$_invoke$arity$1 = create_element__1;
create_element.cljs$core$IFn$_invoke$arity$2 = create_element__2;
return create_element;
})()
;
dommy.core.create_text_node = (function create_text_node(text){return document.createTextNode(text);
});
/**
* Clears all children from `elem`
*/
dommy.core.clear_BANG_ = (function clear_BANG_(elem){return dommy.core.set_html_BANG_.call(null,elem,"");
});
/**
* Append `child` to `parent`
* @param {...*} var_args
*/
dommy.core.append_BANG_ = (function() {
var append_BANG_ = null;
var append_BANG___2 = (function (parent,child){var G__7160 = parent;G__7160.appendChild(child);
return G__7160;
});
var append_BANG___3 = (function() { 
var G__7165__delegate = function (parent,child,more_children){var seq__7161_7166 = cljs.core.seq.call(null,cljs.core.cons.call(null,child,more_children));var chunk__7162_7167 = null;var count__7163_7168 = 0;var i__7164_7169 = 0;while(true){
if((i__7164_7169 < count__7163_7168))
{var c_7170 = cljs.core._nth.call(null,chunk__7162_7167,i__7164_7169);append_BANG_.call(null,parent,c_7170);
{
var G__7171 = seq__7161_7166;
var G__7172 = chunk__7162_7167;
var G__7173 = count__7163_7168;
var G__7174 = (i__7164_7169 + 1);
seq__7161_7166 = G__7171;
chunk__7162_7167 = G__7172;
count__7163_7168 = G__7173;
i__7164_7169 = G__7174;
continue;
}
} else
{var temp__4126__auto___7175 = cljs.core.seq.call(null,seq__7161_7166);if(temp__4126__auto___7175)
{var seq__7161_7176__$1 = temp__4126__auto___7175;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7161_7176__$1))
{var c__4315__auto___7177 = cljs.core.chunk_first.call(null,seq__7161_7176__$1);{
var G__7178 = cljs.core.chunk_rest.call(null,seq__7161_7176__$1);
var G__7179 = c__4315__auto___7177;
var G__7180 = cljs.core.count.call(null,c__4315__auto___7177);
var G__7181 = 0;
seq__7161_7166 = G__7178;
chunk__7162_7167 = G__7179;
count__7163_7168 = G__7180;
i__7164_7169 = G__7181;
continue;
}
} else
{var c_7182 = cljs.core.first.call(null,seq__7161_7176__$1);append_BANG_.call(null,parent,c_7182);
{
var G__7183 = cljs.core.next.call(null,seq__7161_7176__$1);
var G__7184 = null;
var G__7185 = 0;
var G__7186 = 0;
seq__7161_7166 = G__7183;
chunk__7162_7167 = G__7184;
count__7163_7168 = G__7185;
i__7164_7169 = G__7186;
continue;
}
}
} else
{}
}
break;
}
return parent;
};
var G__7165 = function (parent,child,var_args){
var more_children = null;if (arguments.length > 2) {
  more_children = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__7165__delegate.call(this,parent,child,more_children);};
G__7165.cljs$lang$maxFixedArity = 2;
G__7165.cljs$lang$applyTo = (function (arglist__7187){
var parent = cljs.core.first(arglist__7187);
arglist__7187 = cljs.core.next(arglist__7187);
var child = cljs.core.first(arglist__7187);
var more_children = cljs.core.rest(arglist__7187);
return G__7165__delegate(parent,child,more_children);
});
G__7165.cljs$core$IFn$_invoke$arity$variadic = G__7165__delegate;
return G__7165;
})()
;
append_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return append_BANG___2.call(this,parent,child);
default:
return append_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
append_BANG_.cljs$lang$maxFixedArity = 2;
append_BANG_.cljs$lang$applyTo = append_BANG___3.cljs$lang$applyTo;
append_BANG_.cljs$core$IFn$_invoke$arity$2 = append_BANG___2;
append_BANG_.cljs$core$IFn$_invoke$arity$variadic = append_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return append_BANG_;
})()
;
/**
* Prepend `child` to `parent`
* @param {...*} var_args
*/
dommy.core.prepend_BANG_ = (function() {
var prepend_BANG_ = null;
var prepend_BANG___2 = (function (parent,child){var G__7193 = parent;G__7193.insertBefore(child,parent.firstChild);
return G__7193;
});
var prepend_BANG___3 = (function() { 
var G__7198__delegate = function (parent,child,more_children){var seq__7194_7199 = cljs.core.seq.call(null,cljs.core.cons.call(null,child,more_children));var chunk__7195_7200 = null;var count__7196_7201 = 0;var i__7197_7202 = 0;while(true){
if((i__7197_7202 < count__7196_7201))
{var c_7203 = cljs.core._nth.call(null,chunk__7195_7200,i__7197_7202);prepend_BANG_.call(null,parent,c_7203);
{
var G__7204 = seq__7194_7199;
var G__7205 = chunk__7195_7200;
var G__7206 = count__7196_7201;
var G__7207 = (i__7197_7202 + 1);
seq__7194_7199 = G__7204;
chunk__7195_7200 = G__7205;
count__7196_7201 = G__7206;
i__7197_7202 = G__7207;
continue;
}
} else
{var temp__4126__auto___7208 = cljs.core.seq.call(null,seq__7194_7199);if(temp__4126__auto___7208)
{var seq__7194_7209__$1 = temp__4126__auto___7208;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7194_7209__$1))
{var c__4315__auto___7210 = cljs.core.chunk_first.call(null,seq__7194_7209__$1);{
var G__7211 = cljs.core.chunk_rest.call(null,seq__7194_7209__$1);
var G__7212 = c__4315__auto___7210;
var G__7213 = cljs.core.count.call(null,c__4315__auto___7210);
var G__7214 = 0;
seq__7194_7199 = G__7211;
chunk__7195_7200 = G__7212;
count__7196_7201 = G__7213;
i__7197_7202 = G__7214;
continue;
}
} else
{var c_7215 = cljs.core.first.call(null,seq__7194_7209__$1);prepend_BANG_.call(null,parent,c_7215);
{
var G__7216 = cljs.core.next.call(null,seq__7194_7209__$1);
var G__7217 = null;
var G__7218 = 0;
var G__7219 = 0;
seq__7194_7199 = G__7216;
chunk__7195_7200 = G__7217;
count__7196_7201 = G__7218;
i__7197_7202 = G__7219;
continue;
}
}
} else
{}
}
break;
}
return parent;
};
var G__7198 = function (parent,child,var_args){
var more_children = null;if (arguments.length > 2) {
  more_children = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return G__7198__delegate.call(this,parent,child,more_children);};
G__7198.cljs$lang$maxFixedArity = 2;
G__7198.cljs$lang$applyTo = (function (arglist__7220){
var parent = cljs.core.first(arglist__7220);
arglist__7220 = cljs.core.next(arglist__7220);
var child = cljs.core.first(arglist__7220);
var more_children = cljs.core.rest(arglist__7220);
return G__7198__delegate(parent,child,more_children);
});
G__7198.cljs$core$IFn$_invoke$arity$variadic = G__7198__delegate;
return G__7198;
})()
;
prepend_BANG_ = function(parent,child,var_args){
var more_children = var_args;
switch(arguments.length){
case 2:
return prepend_BANG___2.call(this,parent,child);
default:
return prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic(parent,child, cljs.core.array_seq(arguments, 2));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
prepend_BANG_.cljs$lang$maxFixedArity = 2;
prepend_BANG_.cljs$lang$applyTo = prepend_BANG___3.cljs$lang$applyTo;
prepend_BANG_.cljs$core$IFn$_invoke$arity$2 = prepend_BANG___2;
prepend_BANG_.cljs$core$IFn$_invoke$arity$variadic = prepend_BANG___3.cljs$core$IFn$_invoke$arity$variadic;
return prepend_BANG_;
})()
;
/**
* Insert `elem` before `other`, `other` must have a parent
*/
dommy.core.insert_before_BANG_ = (function insert_before_BANG_(elem,other){var p = dommy.core.parent.call(null,other);if(cljs.core.truth_(p))
{} else
{throw (new Error(("Assert failed: Target element must have a parent\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"p","p",-1640531415,null))))));
}
p.insertBefore(elem,other);
return elem;
});
/**
* Insert `elem` after `other`, `other` must have a parent
*/
dommy.core.insert_after_BANG_ = (function insert_after_BANG_(elem,other){var temp__4124__auto___7221 = other.nextSibling;if(cljs.core.truth_(temp__4124__auto___7221))
{var next_7222 = temp__4124__auto___7221;dommy.core.insert_before_BANG_.call(null,elem,next_7222);
} else
{dommy.core.append_BANG_.call(null,dommy.core.parent.call(null,other),elem);
}
return elem;
});
/**
* Replace `elem` with `new`, return `new`
*/
dommy.core.replace_BANG_ = (function replace_BANG_(elem,new$){var p = dommy.core.parent.call(null,elem);if(cljs.core.truth_(p))
{} else
{throw (new Error(("Assert failed: Target element must have a parent\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"p","p",-1640531415,null))))));
}
p.replaceChild(new$,elem);
return new$;
});
/**
* Replace children of `elem` with `child`
*/
dommy.core.replace_contents_BANG_ = (function replace_contents_BANG_(p,child){return dommy.core.append_BANG_.call(null,dommy.core.clear_BANG_.call(null,p),child);
});
/**
* Remove `elem` from `parent`, return `parent`
*/
dommy.core.remove_BANG_ = (function() {
var remove_BANG_ = null;
var remove_BANG___1 = (function (elem){var p = dommy.core.parent.call(null,elem);if(cljs.core.truth_(p))
{} else
{throw (new Error(("Assert failed: Target element must have a parent\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"p","p",-1640531415,null))))));
}
return remove_BANG_.call(null,p,elem);
});
var remove_BANG___2 = (function (p,elem){var G__7224 = p;G__7224.removeChild(elem);
return G__7224;
});
remove_BANG_ = function(p,elem){
switch(arguments.length){
case 1:
return remove_BANG___1.call(this,p);
case 2:
return remove_BANG___2.call(this,p,elem);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_BANG_.cljs$core$IFn$_invoke$arity$1 = remove_BANG___1;
remove_BANG_.cljs$core$IFn$_invoke$arity$2 = remove_BANG___2;
return remove_BANG_;
})()
;
dommy.core.special_listener_makers = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__7225){var vec__7226 = p__7225;var special_mouse_event = cljs.core.nth.call(null,vec__7226,0,null);var real_mouse_event = cljs.core.nth.call(null,vec__7226,1,null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [special_mouse_event,new cljs.core.PersistentArrayMap.fromArray([real_mouse_event,((function (vec__7226,special_mouse_event,real_mouse_event){
return (function (f){return ((function (vec__7226,special_mouse_event,real_mouse_event){
return (function (event){var related_target = event.relatedTarget;var listener_target = (function (){var or__3559__auto__ = event.selectedTarget;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return event.currentTarget;
}
})();if(cljs.core.truth_((function (){var and__3547__auto__ = related_target;if(cljs.core.truth_(and__3547__auto__))
{return dommy.core.descendant_QMARK_.call(null,related_target,listener_target);
} else
{return and__3547__auto__;
}
})()))
{return null;
} else
{return f.call(null,event);
}
});
;})(vec__7226,special_mouse_event,real_mouse_event))
});})(vec__7226,special_mouse_event,real_mouse_event))
], true, false)], null);
}),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mouseenter","mouseenter",2027084997),new cljs.core.Keyword(null,"mouseover","mouseover",1601081963),new cljs.core.Keyword(null,"mouseleave","mouseleave",2033263780),new cljs.core.Keyword(null,"mouseout","mouseout",894298107)], null)));
/**
* fires f if event.target is found with `selector`
*/
dommy.core.live_listener = (function live_listener(elem,selector,f){return (function (event){var selected_target = dommy.core.closest.call(null,elem,event.target,selector);if(cljs.core.truth_((function (){var and__3547__auto__ = selected_target;if(cljs.core.truth_(and__3547__auto__))
{return cljs.core.not.call(null,dommy.core.attr.call(null,selected_target,new cljs.core.Keyword(null,"disabled","disabled",1284845038)));
} else
{return and__3547__auto__;
}
})()))
{event.selectedTarget = selected_target;
return f.call(null,event);
} else
{return null;
}
});
});
/**
* Returns a nested map of event listeners on `elem`
*/
dommy.core.event_listeners = (function event_listeners(elem){var or__3559__auto__ = elem.dommyEventListeners;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
});
/**
* @param {...*} var_args
*/
dommy.core.update_event_listeners_BANG_ = (function() { 
var update_event_listeners_BANG___delegate = function (elem,f,args){var elem__$1 = elem;return elem__$1.dommyEventListeners = cljs.core.apply.call(null,f,dommy.core.event_listeners.call(null,elem__$1),args);
};
var update_event_listeners_BANG_ = function (elem,f,var_args){
var args = null;if (arguments.length > 2) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return update_event_listeners_BANG___delegate.call(this,elem,f,args);};
update_event_listeners_BANG_.cljs$lang$maxFixedArity = 2;
update_event_listeners_BANG_.cljs$lang$applyTo = (function (arglist__7227){
var elem = cljs.core.first(arglist__7227);
arglist__7227 = cljs.core.next(arglist__7227);
var f = cljs.core.first(arglist__7227);
var args = cljs.core.rest(arglist__7227);
return update_event_listeners_BANG___delegate(elem,f,args);
});
update_event_listeners_BANG_.cljs$core$IFn$_invoke$arity$variadic = update_event_listeners_BANG___delegate;
return update_event_listeners_BANG_;
})()
;
dommy.core.elem_and_selector = (function elem_and_selector(elem_sel){if(cljs.core.sequential_QMARK_.call(null,elem_sel))
{return cljs.core.juxt.call(null,cljs.core.first,cljs.core.rest).call(null,elem_sel);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [elem_sel,null], null);
}
});
/**
* Adds `f` as a listener for events of type `event-type` on
* `elem-sel`, which must either be a DOM node, or a sequence
* whose first item is a DOM node.
* 
* In other words, the call to `listen!` can take two forms:
* 
* If `elem-sel` is a DOM node, i.e., you're doing something like:
* 
* (listen! elem :click click-handler)
* 
* then `click-handler` will be set as a listener for `click` events
* on the `elem`.
* 
* If `elem-sel` is a sequence:
* 
* (listen! [elem :.selector.for :.some.descendants] :click click-handler)
* 
* then `click-handler` will be set as a listener for `click` events
* on descendants of `elem` that match the selector
* 
* Also accepts any number of event-type and handler pairs for setting
* multiple listeners at once:
* 
* (listen! some-elem :click click-handler :hover hover-handler)
* @param {...*} var_args
*/
dommy.core.listen_BANG_ = (function() { 
var listen_BANG___delegate = function (elem_sel,type_fs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,type_fs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"type-fs","type-fs",1801297401,null))))))));
}
var vec__7251_7274 = dommy.core.elem_and_selector.call(null,elem_sel);var elem_7275 = cljs.core.nth.call(null,vec__7251_7274,0,null);var selector_7276 = cljs.core.nth.call(null,vec__7251_7274,1,null);var seq__7252_7277 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,type_fs));var chunk__7259_7278 = null;var count__7260_7279 = 0;var i__7261_7280 = 0;while(true){
if((i__7261_7280 < count__7260_7279))
{var vec__7268_7281 = cljs.core._nth.call(null,chunk__7259_7278,i__7261_7280);var orig_type_7282 = cljs.core.nth.call(null,vec__7268_7281,0,null);var f_7283 = cljs.core.nth.call(null,vec__7268_7281,1,null);var seq__7262_7284 = cljs.core.seq.call(null,cljs.core.get.call(null,dommy.core.special_listener_makers,orig_type_7282,new cljs.core.PersistentArrayMap.fromArray([orig_type_7282,cljs.core.identity], true, false)));var chunk__7264_7285 = null;var count__7265_7286 = 0;var i__7266_7287 = 0;while(true){
if((i__7266_7287 < count__7265_7286))
{var vec__7269_7288 = cljs.core._nth.call(null,chunk__7264_7285,i__7266_7287);var actual_type_7289 = cljs.core.nth.call(null,vec__7269_7288,0,null);var factory_7290 = cljs.core.nth.call(null,vec__7269_7288,1,null);var canonical_f_7291 = (cljs.core.truth_(selector_7276)?cljs.core.partial.call(null,dommy.core.live_listener,elem_7275,selector_7276):cljs.core.identity).call(null,factory_7290.call(null,f_7283));dommy.core.update_event_listeners_BANG_.call(null,elem_7275,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_7276,actual_type_7289,f_7283], null),canonical_f_7291);
if(cljs.core.truth_(elem_7275.addEventListener))
{elem_7275.addEventListener(cljs.core.name.call(null,actual_type_7289),canonical_f_7291);
} else
{elem_7275.attachEvent(cljs.core.name.call(null,actual_type_7289),canonical_f_7291);
}
{
var G__7292 = seq__7262_7284;
var G__7293 = chunk__7264_7285;
var G__7294 = count__7265_7286;
var G__7295 = (i__7266_7287 + 1);
seq__7262_7284 = G__7292;
chunk__7264_7285 = G__7293;
count__7265_7286 = G__7294;
i__7266_7287 = G__7295;
continue;
}
} else
{var temp__4126__auto___7296 = cljs.core.seq.call(null,seq__7262_7284);if(temp__4126__auto___7296)
{var seq__7262_7297__$1 = temp__4126__auto___7296;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7262_7297__$1))
{var c__4315__auto___7298 = cljs.core.chunk_first.call(null,seq__7262_7297__$1);{
var G__7299 = cljs.core.chunk_rest.call(null,seq__7262_7297__$1);
var G__7300 = c__4315__auto___7298;
var G__7301 = cljs.core.count.call(null,c__4315__auto___7298);
var G__7302 = 0;
seq__7262_7284 = G__7299;
chunk__7264_7285 = G__7300;
count__7265_7286 = G__7301;
i__7266_7287 = G__7302;
continue;
}
} else
{var vec__7270_7303 = cljs.core.first.call(null,seq__7262_7297__$1);var actual_type_7304 = cljs.core.nth.call(null,vec__7270_7303,0,null);var factory_7305 = cljs.core.nth.call(null,vec__7270_7303,1,null);var canonical_f_7306 = (cljs.core.truth_(selector_7276)?cljs.core.partial.call(null,dommy.core.live_listener,elem_7275,selector_7276):cljs.core.identity).call(null,factory_7305.call(null,f_7283));dommy.core.update_event_listeners_BANG_.call(null,elem_7275,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_7276,actual_type_7304,f_7283], null),canonical_f_7306);
if(cljs.core.truth_(elem_7275.addEventListener))
{elem_7275.addEventListener(cljs.core.name.call(null,actual_type_7304),canonical_f_7306);
} else
{elem_7275.attachEvent(cljs.core.name.call(null,actual_type_7304),canonical_f_7306);
}
{
var G__7307 = cljs.core.next.call(null,seq__7262_7297__$1);
var G__7308 = null;
var G__7309 = 0;
var G__7310 = 0;
seq__7262_7284 = G__7307;
chunk__7264_7285 = G__7308;
count__7265_7286 = G__7309;
i__7266_7287 = G__7310;
continue;
}
}
} else
{}
}
break;
}
{
var G__7311 = seq__7252_7277;
var G__7312 = chunk__7259_7278;
var G__7313 = count__7260_7279;
var G__7314 = (i__7261_7280 + 1);
seq__7252_7277 = G__7311;
chunk__7259_7278 = G__7312;
count__7260_7279 = G__7313;
i__7261_7280 = G__7314;
continue;
}
} else
{var temp__4126__auto___7315 = cljs.core.seq.call(null,seq__7252_7277);if(temp__4126__auto___7315)
{var seq__7252_7316__$1 = temp__4126__auto___7315;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7252_7316__$1))
{var c__4315__auto___7317 = cljs.core.chunk_first.call(null,seq__7252_7316__$1);{
var G__7318 = cljs.core.chunk_rest.call(null,seq__7252_7316__$1);
var G__7319 = c__4315__auto___7317;
var G__7320 = cljs.core.count.call(null,c__4315__auto___7317);
var G__7321 = 0;
seq__7252_7277 = G__7318;
chunk__7259_7278 = G__7319;
count__7260_7279 = G__7320;
i__7261_7280 = G__7321;
continue;
}
} else
{var vec__7271_7322 = cljs.core.first.call(null,seq__7252_7316__$1);var orig_type_7323 = cljs.core.nth.call(null,vec__7271_7322,0,null);var f_7324 = cljs.core.nth.call(null,vec__7271_7322,1,null);var seq__7253_7325 = cljs.core.seq.call(null,cljs.core.get.call(null,dommy.core.special_listener_makers,orig_type_7323,new cljs.core.PersistentArrayMap.fromArray([orig_type_7323,cljs.core.identity], true, false)));var chunk__7255_7326 = null;var count__7256_7327 = 0;var i__7257_7328 = 0;while(true){
if((i__7257_7328 < count__7256_7327))
{var vec__7272_7329 = cljs.core._nth.call(null,chunk__7255_7326,i__7257_7328);var actual_type_7330 = cljs.core.nth.call(null,vec__7272_7329,0,null);var factory_7331 = cljs.core.nth.call(null,vec__7272_7329,1,null);var canonical_f_7332 = (cljs.core.truth_(selector_7276)?cljs.core.partial.call(null,dommy.core.live_listener,elem_7275,selector_7276):cljs.core.identity).call(null,factory_7331.call(null,f_7324));dommy.core.update_event_listeners_BANG_.call(null,elem_7275,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_7276,actual_type_7330,f_7324], null),canonical_f_7332);
if(cljs.core.truth_(elem_7275.addEventListener))
{elem_7275.addEventListener(cljs.core.name.call(null,actual_type_7330),canonical_f_7332);
} else
{elem_7275.attachEvent(cljs.core.name.call(null,actual_type_7330),canonical_f_7332);
}
{
var G__7333 = seq__7253_7325;
var G__7334 = chunk__7255_7326;
var G__7335 = count__7256_7327;
var G__7336 = (i__7257_7328 + 1);
seq__7253_7325 = G__7333;
chunk__7255_7326 = G__7334;
count__7256_7327 = G__7335;
i__7257_7328 = G__7336;
continue;
}
} else
{var temp__4126__auto___7337__$1 = cljs.core.seq.call(null,seq__7253_7325);if(temp__4126__auto___7337__$1)
{var seq__7253_7338__$1 = temp__4126__auto___7337__$1;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7253_7338__$1))
{var c__4315__auto___7339 = cljs.core.chunk_first.call(null,seq__7253_7338__$1);{
var G__7340 = cljs.core.chunk_rest.call(null,seq__7253_7338__$1);
var G__7341 = c__4315__auto___7339;
var G__7342 = cljs.core.count.call(null,c__4315__auto___7339);
var G__7343 = 0;
seq__7253_7325 = G__7340;
chunk__7255_7326 = G__7341;
count__7256_7327 = G__7342;
i__7257_7328 = G__7343;
continue;
}
} else
{var vec__7273_7344 = cljs.core.first.call(null,seq__7253_7338__$1);var actual_type_7345 = cljs.core.nth.call(null,vec__7273_7344,0,null);var factory_7346 = cljs.core.nth.call(null,vec__7273_7344,1,null);var canonical_f_7347 = (cljs.core.truth_(selector_7276)?cljs.core.partial.call(null,dommy.core.live_listener,elem_7275,selector_7276):cljs.core.identity).call(null,factory_7346.call(null,f_7324));dommy.core.update_event_listeners_BANG_.call(null,elem_7275,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_7276,actual_type_7345,f_7324], null),canonical_f_7347);
if(cljs.core.truth_(elem_7275.addEventListener))
{elem_7275.addEventListener(cljs.core.name.call(null,actual_type_7345),canonical_f_7347);
} else
{elem_7275.attachEvent(cljs.core.name.call(null,actual_type_7345),canonical_f_7347);
}
{
var G__7348 = cljs.core.next.call(null,seq__7253_7338__$1);
var G__7349 = null;
var G__7350 = 0;
var G__7351 = 0;
seq__7253_7325 = G__7348;
chunk__7255_7326 = G__7349;
count__7256_7327 = G__7350;
i__7257_7328 = G__7351;
continue;
}
}
} else
{}
}
break;
}
{
var G__7352 = cljs.core.next.call(null,seq__7252_7316__$1);
var G__7353 = null;
var G__7354 = 0;
var G__7355 = 0;
seq__7252_7277 = G__7352;
chunk__7259_7278 = G__7353;
count__7260_7279 = G__7354;
i__7261_7280 = G__7355;
continue;
}
}
} else
{}
}
break;
}
return elem_sel;
};
var listen_BANG_ = function (elem_sel,var_args){
var type_fs = null;if (arguments.length > 1) {
  type_fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return listen_BANG___delegate.call(this,elem_sel,type_fs);};
listen_BANG_.cljs$lang$maxFixedArity = 1;
listen_BANG_.cljs$lang$applyTo = (function (arglist__7356){
var elem_sel = cljs.core.first(arglist__7356);
var type_fs = cljs.core.rest(arglist__7356);
return listen_BANG___delegate(elem_sel,type_fs);
});
listen_BANG_.cljs$core$IFn$_invoke$arity$variadic = listen_BANG___delegate;
return listen_BANG_;
})()
;
/**
* Removes event listener for the element defined in `elem-sel`,
* which is the same format as listen!.
* 
* The following forms are allowed, and will remove all handlers
* that match the parameters passed in:
* 
* (unlisten! [elem :.selector] :click event-listener)
* 
* (unlisten! [elem :.selector]
* :click event-listener
* :mouseover other-event-listener)
* @param {...*} var_args
*/
dommy.core.unlisten_BANG_ = (function() { 
var unlisten_BANG___delegate = function (elem_sel,type_fs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,type_fs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"type-fs","type-fs",1801297401,null))))))));
}
var vec__7380_7403 = dommy.core.elem_and_selector.call(null,elem_sel);var elem_7404 = cljs.core.nth.call(null,vec__7380_7403,0,null);var selector_7405 = cljs.core.nth.call(null,vec__7380_7403,1,null);var seq__7381_7406 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,type_fs));var chunk__7388_7407 = null;var count__7389_7408 = 0;var i__7390_7409 = 0;while(true){
if((i__7390_7409 < count__7389_7408))
{var vec__7397_7410 = cljs.core._nth.call(null,chunk__7388_7407,i__7390_7409);var orig_type_7411 = cljs.core.nth.call(null,vec__7397_7410,0,null);var f_7412 = cljs.core.nth.call(null,vec__7397_7410,1,null);var seq__7391_7413 = cljs.core.seq.call(null,cljs.core.get.call(null,dommy.core.special_listener_makers,orig_type_7411,new cljs.core.PersistentArrayMap.fromArray([orig_type_7411,cljs.core.identity], true, false)));var chunk__7393_7414 = null;var count__7394_7415 = 0;var i__7395_7416 = 0;while(true){
if((i__7395_7416 < count__7394_7415))
{var vec__7398_7417 = cljs.core._nth.call(null,chunk__7393_7414,i__7395_7416);var actual_type_7418 = cljs.core.nth.call(null,vec__7398_7417,0,null);var __7419 = cljs.core.nth.call(null,vec__7398_7417,1,null);var keys_7420 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_7405,actual_type_7418,f_7412], null);var canonical_f_7421 = cljs.core.get_in.call(null,dommy.core.event_listeners.call(null,elem_7404),keys_7420);dommy.core.update_event_listeners_BANG_.call(null,elem_7404,dommy.utils.dissoc_in,keys_7420);
if(cljs.core.truth_(elem_7404.removeEventListener))
{elem_7404.removeEventListener(cljs.core.name.call(null,actual_type_7418),canonical_f_7421);
} else
{elem_7404.detachEvent(cljs.core.name.call(null,actual_type_7418),canonical_f_7421);
}
{
var G__7422 = seq__7391_7413;
var G__7423 = chunk__7393_7414;
var G__7424 = count__7394_7415;
var G__7425 = (i__7395_7416 + 1);
seq__7391_7413 = G__7422;
chunk__7393_7414 = G__7423;
count__7394_7415 = G__7424;
i__7395_7416 = G__7425;
continue;
}
} else
{var temp__4126__auto___7426 = cljs.core.seq.call(null,seq__7391_7413);if(temp__4126__auto___7426)
{var seq__7391_7427__$1 = temp__4126__auto___7426;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7391_7427__$1))
{var c__4315__auto___7428 = cljs.core.chunk_first.call(null,seq__7391_7427__$1);{
var G__7429 = cljs.core.chunk_rest.call(null,seq__7391_7427__$1);
var G__7430 = c__4315__auto___7428;
var G__7431 = cljs.core.count.call(null,c__4315__auto___7428);
var G__7432 = 0;
seq__7391_7413 = G__7429;
chunk__7393_7414 = G__7430;
count__7394_7415 = G__7431;
i__7395_7416 = G__7432;
continue;
}
} else
{var vec__7399_7433 = cljs.core.first.call(null,seq__7391_7427__$1);var actual_type_7434 = cljs.core.nth.call(null,vec__7399_7433,0,null);var __7435 = cljs.core.nth.call(null,vec__7399_7433,1,null);var keys_7436 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_7405,actual_type_7434,f_7412], null);var canonical_f_7437 = cljs.core.get_in.call(null,dommy.core.event_listeners.call(null,elem_7404),keys_7436);dommy.core.update_event_listeners_BANG_.call(null,elem_7404,dommy.utils.dissoc_in,keys_7436);
if(cljs.core.truth_(elem_7404.removeEventListener))
{elem_7404.removeEventListener(cljs.core.name.call(null,actual_type_7434),canonical_f_7437);
} else
{elem_7404.detachEvent(cljs.core.name.call(null,actual_type_7434),canonical_f_7437);
}
{
var G__7438 = cljs.core.next.call(null,seq__7391_7427__$1);
var G__7439 = null;
var G__7440 = 0;
var G__7441 = 0;
seq__7391_7413 = G__7438;
chunk__7393_7414 = G__7439;
count__7394_7415 = G__7440;
i__7395_7416 = G__7441;
continue;
}
}
} else
{}
}
break;
}
{
var G__7442 = seq__7381_7406;
var G__7443 = chunk__7388_7407;
var G__7444 = count__7389_7408;
var G__7445 = (i__7390_7409 + 1);
seq__7381_7406 = G__7442;
chunk__7388_7407 = G__7443;
count__7389_7408 = G__7444;
i__7390_7409 = G__7445;
continue;
}
} else
{var temp__4126__auto___7446 = cljs.core.seq.call(null,seq__7381_7406);if(temp__4126__auto___7446)
{var seq__7381_7447__$1 = temp__4126__auto___7446;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7381_7447__$1))
{var c__4315__auto___7448 = cljs.core.chunk_first.call(null,seq__7381_7447__$1);{
var G__7449 = cljs.core.chunk_rest.call(null,seq__7381_7447__$1);
var G__7450 = c__4315__auto___7448;
var G__7451 = cljs.core.count.call(null,c__4315__auto___7448);
var G__7452 = 0;
seq__7381_7406 = G__7449;
chunk__7388_7407 = G__7450;
count__7389_7408 = G__7451;
i__7390_7409 = G__7452;
continue;
}
} else
{var vec__7400_7453 = cljs.core.first.call(null,seq__7381_7447__$1);var orig_type_7454 = cljs.core.nth.call(null,vec__7400_7453,0,null);var f_7455 = cljs.core.nth.call(null,vec__7400_7453,1,null);var seq__7382_7456 = cljs.core.seq.call(null,cljs.core.get.call(null,dommy.core.special_listener_makers,orig_type_7454,new cljs.core.PersistentArrayMap.fromArray([orig_type_7454,cljs.core.identity], true, false)));var chunk__7384_7457 = null;var count__7385_7458 = 0;var i__7386_7459 = 0;while(true){
if((i__7386_7459 < count__7385_7458))
{var vec__7401_7460 = cljs.core._nth.call(null,chunk__7384_7457,i__7386_7459);var actual_type_7461 = cljs.core.nth.call(null,vec__7401_7460,0,null);var __7462 = cljs.core.nth.call(null,vec__7401_7460,1,null);var keys_7463 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_7405,actual_type_7461,f_7455], null);var canonical_f_7464 = cljs.core.get_in.call(null,dommy.core.event_listeners.call(null,elem_7404),keys_7463);dommy.core.update_event_listeners_BANG_.call(null,elem_7404,dommy.utils.dissoc_in,keys_7463);
if(cljs.core.truth_(elem_7404.removeEventListener))
{elem_7404.removeEventListener(cljs.core.name.call(null,actual_type_7461),canonical_f_7464);
} else
{elem_7404.detachEvent(cljs.core.name.call(null,actual_type_7461),canonical_f_7464);
}
{
var G__7465 = seq__7382_7456;
var G__7466 = chunk__7384_7457;
var G__7467 = count__7385_7458;
var G__7468 = (i__7386_7459 + 1);
seq__7382_7456 = G__7465;
chunk__7384_7457 = G__7466;
count__7385_7458 = G__7467;
i__7386_7459 = G__7468;
continue;
}
} else
{var temp__4126__auto___7469__$1 = cljs.core.seq.call(null,seq__7382_7456);if(temp__4126__auto___7469__$1)
{var seq__7382_7470__$1 = temp__4126__auto___7469__$1;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7382_7470__$1))
{var c__4315__auto___7471 = cljs.core.chunk_first.call(null,seq__7382_7470__$1);{
var G__7472 = cljs.core.chunk_rest.call(null,seq__7382_7470__$1);
var G__7473 = c__4315__auto___7471;
var G__7474 = cljs.core.count.call(null,c__4315__auto___7471);
var G__7475 = 0;
seq__7382_7456 = G__7472;
chunk__7384_7457 = G__7473;
count__7385_7458 = G__7474;
i__7386_7459 = G__7475;
continue;
}
} else
{var vec__7402_7476 = cljs.core.first.call(null,seq__7382_7470__$1);var actual_type_7477 = cljs.core.nth.call(null,vec__7402_7476,0,null);var __7478 = cljs.core.nth.call(null,vec__7402_7476,1,null);var keys_7479 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [selector_7405,actual_type_7477,f_7455], null);var canonical_f_7480 = cljs.core.get_in.call(null,dommy.core.event_listeners.call(null,elem_7404),keys_7479);dommy.core.update_event_listeners_BANG_.call(null,elem_7404,dommy.utils.dissoc_in,keys_7479);
if(cljs.core.truth_(elem_7404.removeEventListener))
{elem_7404.removeEventListener(cljs.core.name.call(null,actual_type_7477),canonical_f_7480);
} else
{elem_7404.detachEvent(cljs.core.name.call(null,actual_type_7477),canonical_f_7480);
}
{
var G__7481 = cljs.core.next.call(null,seq__7382_7470__$1);
var G__7482 = null;
var G__7483 = 0;
var G__7484 = 0;
seq__7382_7456 = G__7481;
chunk__7384_7457 = G__7482;
count__7385_7458 = G__7483;
i__7386_7459 = G__7484;
continue;
}
}
} else
{}
}
break;
}
{
var G__7485 = cljs.core.next.call(null,seq__7381_7447__$1);
var G__7486 = null;
var G__7487 = 0;
var G__7488 = 0;
seq__7381_7406 = G__7485;
chunk__7388_7407 = G__7486;
count__7389_7408 = G__7487;
i__7390_7409 = G__7488;
continue;
}
}
} else
{}
}
break;
}
return elem_sel;
};
var unlisten_BANG_ = function (elem_sel,var_args){
var type_fs = null;if (arguments.length > 1) {
  type_fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return unlisten_BANG___delegate.call(this,elem_sel,type_fs);};
unlisten_BANG_.cljs$lang$maxFixedArity = 1;
unlisten_BANG_.cljs$lang$applyTo = (function (arglist__7489){
var elem_sel = cljs.core.first(arglist__7489);
var type_fs = cljs.core.rest(arglist__7489);
return unlisten_BANG___delegate(elem_sel,type_fs);
});
unlisten_BANG_.cljs$core$IFn$_invoke$arity$variadic = unlisten_BANG___delegate;
return unlisten_BANG_;
})()
;
/**
* Behaves like `listen!`, but removes the listener after the first event occurs.
* @param {...*} var_args
*/
dommy.core.listen_once_BANG_ = (function() { 
var listen_once_BANG___delegate = function (elem_sel,type_fs){if(cljs.core.even_QMARK_.call(null,cljs.core.count.call(null,type_fs)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"even?","even?",-1543640034,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-1545680184,null),new cljs.core.Symbol(null,"type-fs","type-fs",1801297401,null))))))));
}
var vec__7497_7504 = dommy.core.elem_and_selector.call(null,elem_sel);var elem_7505 = cljs.core.nth.call(null,vec__7497_7504,0,null);var selector_7506 = cljs.core.nth.call(null,vec__7497_7504,1,null);var seq__7498_7507 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,type_fs));var chunk__7499_7508 = null;var count__7500_7509 = 0;var i__7501_7510 = 0;while(true){
if((i__7501_7510 < count__7500_7509))
{var vec__7502_7511 = cljs.core._nth.call(null,chunk__7499_7508,i__7501_7510);var type_7512 = cljs.core.nth.call(null,vec__7502_7511,0,null);var f_7513 = cljs.core.nth.call(null,vec__7502_7511,1,null);dommy.core.listen_BANG_.call(null,elem_sel,type_7512,((function (seq__7498_7507,chunk__7499_7508,count__7500_7509,i__7501_7510,vec__7502_7511,type_7512,f_7513,vec__7497_7504,elem_7505,selector_7506){
return (function this_fn(e){dommy.core.unlisten_BANG_.call(null,elem_sel,type_7512,this_fn);
return f_7513.call(null,e);
});})(seq__7498_7507,chunk__7499_7508,count__7500_7509,i__7501_7510,vec__7502_7511,type_7512,f_7513,vec__7497_7504,elem_7505,selector_7506))
);
{
var G__7514 = seq__7498_7507;
var G__7515 = chunk__7499_7508;
var G__7516 = count__7500_7509;
var G__7517 = (i__7501_7510 + 1);
seq__7498_7507 = G__7514;
chunk__7499_7508 = G__7515;
count__7500_7509 = G__7516;
i__7501_7510 = G__7517;
continue;
}
} else
{var temp__4126__auto___7518 = cljs.core.seq.call(null,seq__7498_7507);if(temp__4126__auto___7518)
{var seq__7498_7519__$1 = temp__4126__auto___7518;if(cljs.core.chunked_seq_QMARK_.call(null,seq__7498_7519__$1))
{var c__4315__auto___7520 = cljs.core.chunk_first.call(null,seq__7498_7519__$1);{
var G__7521 = cljs.core.chunk_rest.call(null,seq__7498_7519__$1);
var G__7522 = c__4315__auto___7520;
var G__7523 = cljs.core.count.call(null,c__4315__auto___7520);
var G__7524 = 0;
seq__7498_7507 = G__7521;
chunk__7499_7508 = G__7522;
count__7500_7509 = G__7523;
i__7501_7510 = G__7524;
continue;
}
} else
{var vec__7503_7525 = cljs.core.first.call(null,seq__7498_7519__$1);var type_7526 = cljs.core.nth.call(null,vec__7503_7525,0,null);var f_7527 = cljs.core.nth.call(null,vec__7503_7525,1,null);dommy.core.listen_BANG_.call(null,elem_sel,type_7526,((function (seq__7498_7507,chunk__7499_7508,count__7500_7509,i__7501_7510,vec__7503_7525,type_7526,f_7527,seq__7498_7519__$1,temp__4126__auto___7518,vec__7497_7504,elem_7505,selector_7506){
return (function this_fn(e){dommy.core.unlisten_BANG_.call(null,elem_sel,type_7526,this_fn);
return f_7527.call(null,e);
});})(seq__7498_7507,chunk__7499_7508,count__7500_7509,i__7501_7510,vec__7503_7525,type_7526,f_7527,seq__7498_7519__$1,temp__4126__auto___7518,vec__7497_7504,elem_7505,selector_7506))
);
{
var G__7528 = cljs.core.next.call(null,seq__7498_7519__$1);
var G__7529 = null;
var G__7530 = 0;
var G__7531 = 0;
seq__7498_7507 = G__7528;
chunk__7499_7508 = G__7529;
count__7500_7509 = G__7530;
i__7501_7510 = G__7531;
continue;
}
}
} else
{}
}
break;
}
return elem_sel;
};
var listen_once_BANG_ = function (elem_sel,var_args){
var type_fs = null;if (arguments.length > 1) {
  type_fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return listen_once_BANG___delegate.call(this,elem_sel,type_fs);};
listen_once_BANG_.cljs$lang$maxFixedArity = 1;
listen_once_BANG_.cljs$lang$applyTo = (function (arglist__7532){
var elem_sel = cljs.core.first(arglist__7532);
var type_fs = cljs.core.rest(arglist__7532);
return listen_once_BANG___delegate(elem_sel,type_fs);
});
listen_once_BANG_.cljs$core$IFn$_invoke$arity$variadic = listen_once_BANG___delegate;
return listen_once_BANG_;
})()
;
