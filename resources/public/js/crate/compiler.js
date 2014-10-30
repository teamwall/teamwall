// Compiled by ClojureScript 0.0-2234
goog.provide('crate.compiler');
goog.require('cljs.core');
goog.require('crate.binding');
goog.require('crate.binding');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('goog.style');
goog.require('goog.style');
goog.require('goog.dom');
goog.require('goog.dom');
crate.compiler.xmlns = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"xhtml","xhtml",1127939989),"http://www.w3.org/1999/xhtml",new cljs.core.Keyword(null,"svg","svg",1014018518),"http://www.w3.org/2000/svg"], null);
crate.compiler.group_id = cljs.core.atom.call(null,0);
crate.compiler.bindings = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
crate.compiler.capture_binding = (function capture_binding(tag,b){return cljs.core.swap_BANG_.call(null,crate.compiler.bindings,cljs.core.conj,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tag,b], null));
});
crate.compiler.Element = (function (){var obj5453 = {};return obj5453;
})();
crate.compiler._elem = (function _elem(this$){if((function (){var and__3547__auto__ = this$;if(and__3547__auto__)
{return this$.crate$compiler$Element$_elem$arity$1;
} else
{return and__3547__auto__;
}
})())
{return this$.crate$compiler$Element$_elem$arity$1(this$);
} else
{var x__4186__auto__ = (((this$ == null))?null:this$);return (function (){var or__3559__auto__ = (crate.compiler._elem[goog.typeOf(x__4186__auto__)]);if(or__3559__auto__)
{return or__3559__auto__;
} else
{var or__3559__auto____$1 = (crate.compiler._elem["_"]);if(or__3559__auto____$1)
{return or__3559__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Element.-elem",this$);
}
}
})().call(null,this$);
}
});
crate.compiler.as_content = (function as_content(parent,content){var seq__5460 = cljs.core.seq.call(null,content);var chunk__5461 = null;var count__5462 = 0;var i__5463 = 0;while(true){
if((i__5463 < count__5462))
{var c = cljs.core._nth.call(null,chunk__5461,i__5463);var child_5466 = (((function (){var G__5464 = c;if(G__5464)
{var bit__4209__auto__ = null;if(cljs.core.truth_((function (){var or__3559__auto__ = bit__4209__auto__;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return G__5464.crate$compiler$Element$;
}
})()))
{return true;
} else
{if((!G__5464.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,G__5464);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,G__5464);
}
})())?crate.compiler._elem.call(null,c):(((c == null))?null:((cljs.core.map_QMARK_.call(null,c))?(function(){throw "Maps cannot be used as content"})():((typeof c === 'string')?goog.dom.createTextNode(c):((cljs.core.vector_QMARK_.call(null,c))?crate.compiler.elem_factory.call(null,c):((cljs.core.seq_QMARK_.call(null,c))?as_content.call(null,parent,c):((crate.binding.binding_coll_QMARK_.call(null,c))?(function (){crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"coll","coll",1016963678),c);
return as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})():((crate.binding.binding_QMARK_.call(null,c))?(function (){crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"text","text",1017460895),c);
return as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})():(cljs.core.truth_(c.nodeName)?c:(cljs.core.truth_(c.get)?c.get(0):((new cljs.core.Keyword(null,"else","else",1017020587))?goog.dom.createTextNode((''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c))):null)))))))))));if(cljs.core.truth_(child_5466))
{goog.dom.appendChild(parent,child_5466);
} else
{}
{
var G__5467 = seq__5460;
var G__5468 = chunk__5461;
var G__5469 = count__5462;
var G__5470 = (i__5463 + 1);
seq__5460 = G__5467;
chunk__5461 = G__5468;
count__5462 = G__5469;
i__5463 = G__5470;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__5460);if(temp__4126__auto__)
{var seq__5460__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5460__$1))
{var c__4315__auto__ = cljs.core.chunk_first.call(null,seq__5460__$1);{
var G__5471 = cljs.core.chunk_rest.call(null,seq__5460__$1);
var G__5472 = c__4315__auto__;
var G__5473 = cljs.core.count.call(null,c__4315__auto__);
var G__5474 = 0;
seq__5460 = G__5471;
chunk__5461 = G__5472;
count__5462 = G__5473;
i__5463 = G__5474;
continue;
}
} else
{var c = cljs.core.first.call(null,seq__5460__$1);var child_5475 = (((function (){var G__5465 = c;if(G__5465)
{var bit__4209__auto__ = null;if(cljs.core.truth_((function (){var or__3559__auto__ = bit__4209__auto__;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return G__5465.crate$compiler$Element$;
}
})()))
{return true;
} else
{if((!G__5465.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,G__5465);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,crate.compiler.Element,G__5465);
}
})())?crate.compiler._elem.call(null,c):(((c == null))?null:((cljs.core.map_QMARK_.call(null,c))?(function(){throw "Maps cannot be used as content"})():((typeof c === 'string')?goog.dom.createTextNode(c):((cljs.core.vector_QMARK_.call(null,c))?crate.compiler.elem_factory.call(null,c):((cljs.core.seq_QMARK_.call(null,c))?as_content.call(null,parent,c):((crate.binding.binding_coll_QMARK_.call(null,c))?(function (){crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"coll","coll",1016963678),c);
return as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})():((crate.binding.binding_QMARK_.call(null,c))?(function (){crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"text","text",1017460895),c);
return as_content.call(null,parent,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [crate.binding.value.call(null,c)], null));
})():(cljs.core.truth_(c.nodeName)?c:(cljs.core.truth_(c.get)?c.get(0):((new cljs.core.Keyword(null,"else","else",1017020587))?goog.dom.createTextNode((''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(c))):null)))))))))));if(cljs.core.truth_(child_5475))
{goog.dom.appendChild(parent,child_5475);
} else
{}
{
var G__5476 = cljs.core.next.call(null,seq__5460__$1);
var G__5477 = null;
var G__5478 = 0;
var G__5479 = 0;
seq__5460 = G__5476;
chunk__5461 = G__5477;
count__5462 = G__5478;
i__5463 = G__5479;
continue;
}
}
} else
{return null;
}
}
break;
}
});
crate.compiler.dom_binding = (function (){var method_table__4425__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4426__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4427__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4428__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4429__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",3129050535),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("dom-binding",((function (method_table__4425__auto__,prefer_table__4426__auto__,method_cache__4427__auto__,cached_hierarchy__4428__auto__,hierarchy__4429__auto__){
return (function (type,_,___$1){return type;
});})(method_table__4425__auto__,prefer_table__4426__auto__,method_cache__4427__auto__,cached_hierarchy__4428__auto__,hierarchy__4429__auto__))
,new cljs.core.Keyword(null,"default","default",2558708147),hierarchy__4429__auto__,method_table__4425__auto__,prefer_table__4426__auto__,method_cache__4427__auto__,cached_hierarchy__4428__auto__));
})();
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"text","text",1017460895),(function (_,b,elem){return crate.binding.on_change.call(null,b,(function (v){goog.dom.removeChildren(elem);
return crate.compiler.as_content.call(null,elem,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));
}));
}));
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"attr","attr",1016909155),(function (_,p__5480,elem){var vec__5481 = p__5480;var k = cljs.core.nth.call(null,vec__5481,0,null);var b = cljs.core.nth.call(null,vec__5481,1,null);return crate.binding.on_change.call(null,b,((function (vec__5481,k,b){
return (function (v){return crate.compiler.dom_attr.call(null,elem,k,v);
});})(vec__5481,k,b))
);
}));
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"style","style",1123684643),(function (_,p__5482,elem){var vec__5483 = p__5482;var k = cljs.core.nth.call(null,vec__5483,0,null);var b = cljs.core.nth.call(null,vec__5483,1,null);return crate.binding.on_change.call(null,b,((function (vec__5483,k,b){
return (function (v){if(cljs.core.truth_(k))
{return crate.compiler.dom_style.call(null,elem,k,v);
} else
{return crate.compiler.dom_style.call(null,elem,v);
}
});})(vec__5483,k,b))
);
}));
crate.compiler.dom_add = (function dom_add(bc,parent,elem,v){var temp__4124__auto__ = crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"add","add",1014000659));if(cljs.core.truth_(temp__4124__auto__))
{var adder = temp__4124__auto__;return adder.call(null,parent,elem,v);
} else
{return goog.dom.appendChild(parent,elem);
}
});
crate.compiler.dom_remove = (function dom_remove(bc,elem){var temp__4124__auto__ = crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"remove","remove",4374260726));if(cljs.core.truth_(temp__4124__auto__))
{var remover = temp__4124__auto__;return remover.call(null,elem);
} else
{return goog.dom.removeNode(elem);
}
});
cljs.core._add_method.call(null,crate.compiler.dom_binding,new cljs.core.Keyword(null,"coll","coll",1016963678),(function (_,bc,parent){return crate.binding.on_change.call(null,bc,(function (type,elem,v){var pred__5484 = cljs.core._EQ_;var expr__5485 = type;if(cljs.core.truth_(pred__5484.call(null,new cljs.core.Keyword(null,"add","add",1014000659),expr__5485)))
{return crate.compiler.dom_add.call(null,bc,parent,elem,v);
} else
{if(cljs.core.truth_(pred__5484.call(null,new cljs.core.Keyword(null,"remove","remove",4374260726),expr__5485)))
{return crate.compiler.dom_remove.call(null,bc,elem);
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__5485))));
}
}
}));
}));
crate.compiler.handle_bindings = (function handle_bindings(bs,elem){var seq__5493 = cljs.core.seq.call(null,bs);var chunk__5494 = null;var count__5495 = 0;var i__5496 = 0;while(true){
if((i__5496 < count__5495))
{var vec__5497 = cljs.core._nth.call(null,chunk__5494,i__5496);var type = cljs.core.nth.call(null,vec__5497,0,null);var b = cljs.core.nth.call(null,vec__5497,1,null);crate.compiler.dom_binding.call(null,type,b,elem);
{
var G__5499 = seq__5493;
var G__5500 = chunk__5494;
var G__5501 = count__5495;
var G__5502 = (i__5496 + 1);
seq__5493 = G__5499;
chunk__5494 = G__5500;
count__5495 = G__5501;
i__5496 = G__5502;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__5493);if(temp__4126__auto__)
{var seq__5493__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5493__$1))
{var c__4315__auto__ = cljs.core.chunk_first.call(null,seq__5493__$1);{
var G__5503 = cljs.core.chunk_rest.call(null,seq__5493__$1);
var G__5504 = c__4315__auto__;
var G__5505 = cljs.core.count.call(null,c__4315__auto__);
var G__5506 = 0;
seq__5493 = G__5503;
chunk__5494 = G__5504;
count__5495 = G__5505;
i__5496 = G__5506;
continue;
}
} else
{var vec__5498 = cljs.core.first.call(null,seq__5493__$1);var type = cljs.core.nth.call(null,vec__5498,0,null);var b = cljs.core.nth.call(null,vec__5498,1,null);crate.compiler.dom_binding.call(null,type,b,elem);
{
var G__5507 = cljs.core.next.call(null,seq__5493__$1);
var G__5508 = null;
var G__5509 = 0;
var G__5510 = 0;
seq__5493 = G__5507;
chunk__5494 = G__5508;
count__5495 = G__5509;
i__5496 = G__5510;
continue;
}
}
} else
{return null;
}
}
break;
}
});
crate.compiler.dom_style = (function() {
var dom_style = null;
var dom_style__2 = (function (elem,v){if(typeof v === 'string')
{elem.setAttribute("style",v);
} else
{if(cljs.core.map_QMARK_.call(null,v))
{var seq__5517_5523 = cljs.core.seq.call(null,v);var chunk__5518_5524 = null;var count__5519_5525 = 0;var i__5520_5526 = 0;while(true){
if((i__5520_5526 < count__5519_5525))
{var vec__5521_5527 = cljs.core._nth.call(null,chunk__5518_5524,i__5520_5526);var k_5528 = cljs.core.nth.call(null,vec__5521_5527,0,null);var v_5529__$1 = cljs.core.nth.call(null,vec__5521_5527,1,null);dom_style.call(null,elem,k_5528,v_5529__$1);
{
var G__5530 = seq__5517_5523;
var G__5531 = chunk__5518_5524;
var G__5532 = count__5519_5525;
var G__5533 = (i__5520_5526 + 1);
seq__5517_5523 = G__5530;
chunk__5518_5524 = G__5531;
count__5519_5525 = G__5532;
i__5520_5526 = G__5533;
continue;
}
} else
{var temp__4126__auto___5534 = cljs.core.seq.call(null,seq__5517_5523);if(temp__4126__auto___5534)
{var seq__5517_5535__$1 = temp__4126__auto___5534;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5517_5535__$1))
{var c__4315__auto___5536 = cljs.core.chunk_first.call(null,seq__5517_5535__$1);{
var G__5537 = cljs.core.chunk_rest.call(null,seq__5517_5535__$1);
var G__5538 = c__4315__auto___5536;
var G__5539 = cljs.core.count.call(null,c__4315__auto___5536);
var G__5540 = 0;
seq__5517_5523 = G__5537;
chunk__5518_5524 = G__5538;
count__5519_5525 = G__5539;
i__5520_5526 = G__5540;
continue;
}
} else
{var vec__5522_5541 = cljs.core.first.call(null,seq__5517_5535__$1);var k_5542 = cljs.core.nth.call(null,vec__5522_5541,0,null);var v_5543__$1 = cljs.core.nth.call(null,vec__5522_5541,1,null);dom_style.call(null,elem,k_5542,v_5543__$1);
{
var G__5544 = cljs.core.next.call(null,seq__5517_5535__$1);
var G__5545 = null;
var G__5546 = 0;
var G__5547 = 0;
seq__5517_5523 = G__5544;
chunk__5518_5524 = G__5545;
count__5519_5525 = G__5546;
i__5520_5526 = G__5547;
continue;
}
}
} else
{}
}
break;
}
} else
{if(crate.binding.binding_QMARK_.call(null,v))
{crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,v], null));
dom_style.call(null,elem,crate.binding.value.call(null,v));
} else
{}
}
}
return elem;
});
var dom_style__3 = (function (elem,k,v){var v__$1 = ((crate.binding.binding_QMARK_.call(null,v))?(function (){crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"style","style",1123684643),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));
return crate.binding.value.call(null,v);
})():v);return goog.style.setStyle(elem,cljs.core.name.call(null,k),v__$1);
});
dom_style = function(elem,k,v){
switch(arguments.length){
case 2:
return dom_style__2.call(this,elem,k);
case 3:
return dom_style__3.call(this,elem,k,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dom_style.cljs$core$IFn$_invoke$arity$2 = dom_style__2;
dom_style.cljs$core$IFn$_invoke$arity$3 = dom_style__3;
return dom_style;
})()
;
crate.compiler.dom_attr = (function() {
var dom_attr = null;
var dom_attr__2 = (function (elem,attrs){if(cljs.core.truth_(elem))
{if(!(cljs.core.map_QMARK_.call(null,attrs)))
{return elem.getAttribute(cljs.core.name.call(null,attrs));
} else
{var seq__5554_5560 = cljs.core.seq.call(null,attrs);var chunk__5555_5561 = null;var count__5556_5562 = 0;var i__5557_5563 = 0;while(true){
if((i__5557_5563 < count__5556_5562))
{var vec__5558_5564 = cljs.core._nth.call(null,chunk__5555_5561,i__5557_5563);var k_5565 = cljs.core.nth.call(null,vec__5558_5564,0,null);var v_5566 = cljs.core.nth.call(null,vec__5558_5564,1,null);dom_attr.call(null,elem,k_5565,v_5566);
{
var G__5567 = seq__5554_5560;
var G__5568 = chunk__5555_5561;
var G__5569 = count__5556_5562;
var G__5570 = (i__5557_5563 + 1);
seq__5554_5560 = G__5567;
chunk__5555_5561 = G__5568;
count__5556_5562 = G__5569;
i__5557_5563 = G__5570;
continue;
}
} else
{var temp__4126__auto___5571 = cljs.core.seq.call(null,seq__5554_5560);if(temp__4126__auto___5571)
{var seq__5554_5572__$1 = temp__4126__auto___5571;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5554_5572__$1))
{var c__4315__auto___5573 = cljs.core.chunk_first.call(null,seq__5554_5572__$1);{
var G__5574 = cljs.core.chunk_rest.call(null,seq__5554_5572__$1);
var G__5575 = c__4315__auto___5573;
var G__5576 = cljs.core.count.call(null,c__4315__auto___5573);
var G__5577 = 0;
seq__5554_5560 = G__5574;
chunk__5555_5561 = G__5575;
count__5556_5562 = G__5576;
i__5557_5563 = G__5577;
continue;
}
} else
{var vec__5559_5578 = cljs.core.first.call(null,seq__5554_5572__$1);var k_5579 = cljs.core.nth.call(null,vec__5559_5578,0,null);var v_5580 = cljs.core.nth.call(null,vec__5559_5578,1,null);dom_attr.call(null,elem,k_5579,v_5580);
{
var G__5581 = cljs.core.next.call(null,seq__5554_5572__$1);
var G__5582 = null;
var G__5583 = 0;
var G__5584 = 0;
seq__5554_5560 = G__5581;
chunk__5555_5561 = G__5582;
count__5556_5562 = G__5583;
i__5557_5563 = G__5584;
continue;
}
}
} else
{}
}
break;
}
return elem;
}
} else
{return null;
}
});
var dom_attr__3 = (function (elem,k,v){if(cljs.core._EQ_.call(null,k,new cljs.core.Keyword(null,"style","style",1123684643)))
{crate.compiler.dom_style.call(null,elem,v);
} else
{var v_5585__$1 = ((crate.binding.binding_QMARK_.call(null,v))?(function (){crate.compiler.capture_binding.call(null,new cljs.core.Keyword(null,"attr","attr",1016909155),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));
return crate.binding.value.call(null,v);
})():v);elem.setAttribute(cljs.core.name.call(null,k),v_5585__$1);
}
return elem;
});
dom_attr = function(elem,k,v){
switch(arguments.length){
case 2:
return dom_attr__2.call(this,elem,k);
case 3:
return dom_attr__3.call(this,elem,k,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dom_attr.cljs$core$IFn$_invoke$arity$2 = dom_attr__2;
dom_attr.cljs$core$IFn$_invoke$arity$3 = dom_attr__3;
return dom_attr;
})()
;
/**
* Regular expression that parses a CSS-style id and class from a tag name.
*/
crate.compiler.re_tag = /([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?/;
crate.compiler.normalize_map_attrs = (function normalize_map_attrs(map_attrs){return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__5588){var vec__5589 = p__5588;var n = cljs.core.nth.call(null,vec__5589,0,null);var v = cljs.core.nth.call(null,vec__5589,1,null);if(v === true)
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [n,cljs.core.name.call(null,n)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [n,v], null);
}
}),cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.boolean$,cljs.core.second),map_attrs)));
});
/**
* Ensure a tag vector is of the form [tag-name attrs content].
*/
crate.compiler.normalize_element = (function normalize_element(p__5591){var vec__5596 = p__5591;var tag = cljs.core.nth.call(null,vec__5596,0,null);var content = cljs.core.nthnext.call(null,vec__5596,1);if(!(((tag instanceof cljs.core.Keyword)) || ((tag instanceof cljs.core.Symbol)) || (typeof tag === 'string')))
{throw (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(tag)+" is not a valid tag name.");
} else
{}
var vec__5597 = cljs.core.re_matches.call(null,crate.compiler.re_tag,cljs.core.name.call(null,tag));var _ = cljs.core.nth.call(null,vec__5597,0,null);var tag__$1 = cljs.core.nth.call(null,vec__5597,1,null);var id = cljs.core.nth.call(null,vec__5597,2,null);var class$ = cljs.core.nth.call(null,vec__5597,3,null);var vec__5598 = (function (){var vec__5599 = clojure.string.split.call(null,tag__$1,/:/);var nsp = cljs.core.nth.call(null,vec__5599,0,null);var t = cljs.core.nth.call(null,vec__5599,1,null);var ns_xmlns = crate.compiler.xmlns.call(null,cljs.core.keyword.call(null,nsp));if(cljs.core.truth_(t))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var or__3559__auto__ = ns_xmlns;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return nsp;
}
})(),t], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"xhtml","xhtml",1127939989).cljs$core$IFn$_invoke$arity$1(crate.compiler.xmlns),nsp], null);
}
})();var nsp = cljs.core.nth.call(null,vec__5598,0,null);var tag__$2 = cljs.core.nth.call(null,vec__5598,1,null);var tag_attrs = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.call(null,((function (vec__5597,_,tag__$1,id,class$,vec__5598,nsp,tag__$2,vec__5596,tag,content){
return (function (p1__5590_SHARP_){return !((cljs.core.second.call(null,p1__5590_SHARP_) == null));
});})(vec__5597,_,tag__$1,id,class$,vec__5598,nsp,tag__$2,vec__5596,tag,content))
,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",1013907597),(function (){var or__3559__auto__ = id;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return null;
}
})(),new cljs.core.Keyword(null,"class","class",1108647146),(cljs.core.truth_(class$)?clojure.string.replace.call(null,class$,/\./," "):null)], null)));var map_attrs = cljs.core.first.call(null,content);if(cljs.core.map_QMARK_.call(null,map_attrs))
{return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [nsp,tag__$2,cljs.core.merge.call(null,tag_attrs,crate.compiler.normalize_map_attrs.call(null,map_attrs)),cljs.core.next.call(null,content)], null);
} else
{return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [nsp,tag__$2,tag_attrs,content], null);
}
});
crate.compiler.parse_content = (function parse_content(elem,content){var attrs = cljs.core.first.call(null,content);if(cljs.core.map_QMARK_.call(null,attrs))
{crate.compiler.dom_attr.call(null,elem,attrs);
return cljs.core.rest.call(null,content);
} else
{return content;
}
});
crate.compiler.create_elem = (cljs.core.truth_(document.createElementNS)?(function (nsp,tag){return document.createElementNS(nsp,tag);
}):(function (_,tag){return document.createElement(tag);
}));
crate.compiler.elem_factory = (function elem_factory(tag_def){var bindings5602 = crate.compiler.bindings;try{crate.compiler.bindings = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
var vec__5603 = crate.compiler.normalize_element.call(null,tag_def);var nsp = cljs.core.nth.call(null,vec__5603,0,null);var tag = cljs.core.nth.call(null,vec__5603,1,null);var attrs = cljs.core.nth.call(null,vec__5603,2,null);var content = cljs.core.nth.call(null,vec__5603,3,null);var elem = crate.compiler.create_elem.call(null,nsp,tag);crate.compiler.dom_attr.call(null,elem,attrs);
crate.compiler.as_content.call(null,elem,content);
crate.compiler.handle_bindings.call(null,cljs.core.deref.call(null,crate.compiler.bindings),elem);
return elem;
}finally {crate.compiler.bindings = bindings5602;
}});
/**
* Add an optional attribute argument to a function that returns a vector tag.
*/
crate.compiler.add_optional_attrs = (function add_optional_attrs(func){return (function() { 
var G__5606__delegate = function (args){if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,args)))
{var vec__5605 = cljs.core.apply.call(null,func,cljs.core.rest.call(null,args));var tag = cljs.core.nth.call(null,vec__5605,0,null);var body = cljs.core.nthnext.call(null,vec__5605,1);if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,body)))
{return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.merge.call(null,cljs.core.first.call(null,body),cljs.core.first.call(null,args)),cljs.core.rest.call(null,body));
} else
{return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.first.call(null,args),body);
}
} else
{return cljs.core.apply.call(null,func,args);
}
};
var G__5606 = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__5606__delegate.call(this,args);};
G__5606.cljs$lang$maxFixedArity = 0;
G__5606.cljs$lang$applyTo = (function (arglist__5607){
var args = cljs.core.seq(arglist__5607);
return G__5606__delegate(args);
});
G__5606.cljs$core$IFn$_invoke$arity$variadic = G__5606__delegate;
return G__5606;
})()
;
});
