// Compiled by ClojureScript 0.0-2234
goog.provide('crate.binding');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('clojure.set');

/**
* @constructor
*/
crate.binding.SubAtom = (function (atm,path,prevhash,watches,key){
this.atm = atm;
this.path = path;
this.prevhash = prevhash;
this.watches = watches;
this.key = key;
this.cljs$lang$protocol_mask$partition0$ = 2153807872;
this.cljs$lang$protocol_mask$partition1$ = 2;
})
crate.binding.SubAtom.cljs$lang$type = true;
crate.binding.SubAtom.cljs$lang$ctorStr = "crate.binding/SubAtom";
crate.binding.SubAtom.cljs$lang$ctorPrWriter = (function (this__4126__auto__,writer__4127__auto__,opt__4128__auto__){return cljs.core._write.call(null,writer__4127__auto__,"crate.binding/SubAtom");
});
crate.binding.SubAtom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return goog.getUid(this$__$1);
});
crate.binding.SubAtom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){var self__ = this;
var this$__$1 = this;var seq__5608 = cljs.core.seq.call(null,self__.watches);var chunk__5609 = null;var count__5610 = 0;var i__5611 = 0;while(true){
if((i__5611 < count__5610))
{var vec__5612 = cljs.core._nth.call(null,chunk__5609,i__5611);var key__$1 = cljs.core.nth.call(null,vec__5612,0,null);var f = cljs.core.nth.call(null,vec__5612,1,null);f.call(null,key__$1,this$__$1,oldval,newval);
{
var G__5614 = seq__5608;
var G__5615 = chunk__5609;
var G__5616 = count__5610;
var G__5617 = (i__5611 + 1);
seq__5608 = G__5614;
chunk__5609 = G__5615;
count__5610 = G__5616;
i__5611 = G__5617;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__5608);if(temp__4126__auto__)
{var seq__5608__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5608__$1))
{var c__4315__auto__ = cljs.core.chunk_first.call(null,seq__5608__$1);{
var G__5618 = cljs.core.chunk_rest.call(null,seq__5608__$1);
var G__5619 = c__4315__auto__;
var G__5620 = cljs.core.count.call(null,c__4315__auto__);
var G__5621 = 0;
seq__5608 = G__5618;
chunk__5609 = G__5619;
count__5610 = G__5620;
i__5611 = G__5621;
continue;
}
} else
{var vec__5613 = cljs.core.first.call(null,seq__5608__$1);var key__$1 = cljs.core.nth.call(null,vec__5613,0,null);var f = cljs.core.nth.call(null,vec__5613,1,null);f.call(null,key__$1,this$__$1,oldval,newval);
{
var G__5622 = cljs.core.next.call(null,seq__5608__$1);
var G__5623 = null;
var G__5624 = 0;
var G__5625 = 0;
seq__5608 = G__5622;
chunk__5609 = G__5623;
count__5610 = G__5624;
i__5611 = G__5625;
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
crate.binding.SubAtom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key__$1,f){var self__ = this;
var this$__$1 = this;if(cljs.core.truth_(f))
{return this$__$1.watches = cljs.core.assoc.call(null,self__.watches,key__$1,f);
} else
{return null;
}
});
crate.binding.SubAtom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key__$1){var self__ = this;
var this$__$1 = this;return this$__$1.watches = cljs.core.dissoc.call(null,self__.watches,key__$1);
});
crate.binding.SubAtom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){var self__ = this;
var this$__$1 = this;return cljs.core._write.call(null,writer,("#<SubAtom: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,self__.atm),self__.path)))+">"));
});
crate.binding.SubAtom.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.atm))
{return cljs.core.get_in.call(null,cljs.core.deref.call(null,self__.atm),self__.path);
} else
{return null;
}
});
crate.binding.SubAtom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){var self__ = this;
var o__$1 = this;return (o__$1 === other);
});
crate.binding.__GT_SubAtom = (function __GT_SubAtom(atm,path,prevhash,watches,key){return (new crate.binding.SubAtom(atm,path,prevhash,watches,key));
});
crate.binding.subatom = (function subatom(atm,path){var path__$1 = ((cljs.core.coll_QMARK_.call(null,path))?path:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [path], null));var vec__5627 = (((atm instanceof crate.binding.SubAtom))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [atm.atm,cljs.core.concat.call(null,atm.path,path__$1)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [atm,path__$1], null));var atm__$1 = cljs.core.nth.call(null,vec__5627,0,null);var path__$2 = cljs.core.nth.call(null,vec__5627,1,null);var k = cljs.core.gensym.call(null,"subatom");var sa = (new crate.binding.SubAtom(atm__$1,path__$2,cljs.core.hash.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,atm__$1),path__$2)),null,k));cljs.core.add_watch.call(null,atm__$1,k,((function (path__$1,vec__5627,atm__$1,path__$2,k,sa){
return (function (_,___$1,ov,nv){var latest = cljs.core.get_in.call(null,nv,path__$2);var prev = cljs.core.get_in.call(null,ov,path__$2);var latest_hash = cljs.core.hash.call(null,latest);if((cljs.core.not_EQ_.call(null,sa.prevhash,latest_hash)) && (cljs.core.not_EQ_.call(null,prev,latest)))
{sa.prevhash = latest_hash;
return cljs.core._notify_watches.call(null,sa,cljs.core.get_in.call(null,ov,path__$2),latest);
} else
{return null;
}
});})(path__$1,vec__5627,atm__$1,path__$2,k,sa))
);
return sa;
});
/**
* Sets the value of atom to newval without regard for the
* current value. Returns newval.
*/
crate.binding.sub_reset_BANG_ = (function sub_reset_BANG_(sa,new_value){cljs.core.swap_BANG_.call(null,sa.atm,cljs.core.assoc_in,sa.path,new_value);
return new_value;
});
/**
* Atomically swaps the value of atom to be:
* (apply f current-value-of-atom args). Note that f may be called
* multiple times, and thus should be free of side effects.  Returns
* the value that was swapped in.
* @param {...*} var_args
*/
crate.binding.sub_swap_BANG_ = (function() {
var sub_swap_BANG_ = null;
var sub_swap_BANG___2 = (function (sa,f){return crate.binding.sub_reset_BANG_.call(null,sa,f.call(null,cljs.core.deref.call(null,sa)));
});
var sub_swap_BANG___3 = (function (sa,f,x){return crate.binding.sub_reset_BANG_.call(null,sa,f.call(null,cljs.core.deref.call(null,sa),x));
});
var sub_swap_BANG___4 = (function (sa,f,x,y){return crate.binding.sub_reset_BANG_.call(null,sa,f.call(null,cljs.core.deref.call(null,sa),x,y));
});
var sub_swap_BANG___5 = (function (sa,f,x,y,z){return crate.binding.sub_reset_BANG_.call(null,sa,f.call(null,cljs.core.deref.call(null,sa),x,y,z));
});
var sub_swap_BANG___6 = (function() { 
var G__5628__delegate = function (sa,f,x,y,z,more){return crate.binding.sub_reset_BANG_.call(null,sa,cljs.core.apply.call(null,f,cljs.core.deref.call(null,sa),x,y,z,more));
};
var G__5628 = function (sa,f,x,y,z,var_args){
var more = null;if (arguments.length > 5) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);} 
return G__5628__delegate.call(this,sa,f,x,y,z,more);};
G__5628.cljs$lang$maxFixedArity = 5;
G__5628.cljs$lang$applyTo = (function (arglist__5629){
var sa = cljs.core.first(arglist__5629);
arglist__5629 = cljs.core.next(arglist__5629);
var f = cljs.core.first(arglist__5629);
arglist__5629 = cljs.core.next(arglist__5629);
var x = cljs.core.first(arglist__5629);
arglist__5629 = cljs.core.next(arglist__5629);
var y = cljs.core.first(arglist__5629);
arglist__5629 = cljs.core.next(arglist__5629);
var z = cljs.core.first(arglist__5629);
var more = cljs.core.rest(arglist__5629);
return G__5628__delegate(sa,f,x,y,z,more);
});
G__5628.cljs$core$IFn$_invoke$arity$variadic = G__5628__delegate;
return G__5628;
})()
;
sub_swap_BANG_ = function(sa,f,x,y,z,var_args){
var more = var_args;
switch(arguments.length){
case 2:
return sub_swap_BANG___2.call(this,sa,f);
case 3:
return sub_swap_BANG___3.call(this,sa,f,x);
case 4:
return sub_swap_BANG___4.call(this,sa,f,x,y);
case 5:
return sub_swap_BANG___5.call(this,sa,f,x,y,z);
default:
return sub_swap_BANG___6.cljs$core$IFn$_invoke$arity$variadic(sa,f,x,y,z, cljs.core.array_seq(arguments, 5));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub_swap_BANG_.cljs$lang$maxFixedArity = 5;
sub_swap_BANG_.cljs$lang$applyTo = sub_swap_BANG___6.cljs$lang$applyTo;
sub_swap_BANG_.cljs$core$IFn$_invoke$arity$2 = sub_swap_BANG___2;
sub_swap_BANG_.cljs$core$IFn$_invoke$arity$3 = sub_swap_BANG___3;
sub_swap_BANG_.cljs$core$IFn$_invoke$arity$4 = sub_swap_BANG___4;
sub_swap_BANG_.cljs$core$IFn$_invoke$arity$5 = sub_swap_BANG___5;
sub_swap_BANG_.cljs$core$IFn$_invoke$arity$variadic = sub_swap_BANG___6.cljs$core$IFn$_invoke$arity$variadic;
return sub_swap_BANG_;
})()
;
crate.binding.sub_destroy_BANG_ = (function sub_destroy_BANG_(sa){cljs.core.remove_watch.call(null,sa.atm,sa.key);
sa.watches = null;
return sa.atm = null;
});
crate.binding.computable = (function (){var obj5631 = {};return obj5631;
})();
crate.binding._depend = (function _depend(this$,atm){if((function (){var and__3547__auto__ = this$;if(and__3547__auto__)
{return this$.crate$binding$computable$_depend$arity$2;
} else
{return and__3547__auto__;
}
})())
{return this$.crate$binding$computable$_depend$arity$2(this$,atm);
} else
{var x__4186__auto__ = (((this$ == null))?null:this$);return (function (){var or__3559__auto__ = (crate.binding._depend[goog.typeOf(x__4186__auto__)]);if(or__3559__auto__)
{return or__3559__auto__;
} else
{var or__3559__auto____$1 = (crate.binding._depend["_"]);if(or__3559__auto____$1)
{return or__3559__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"computable.-depend",this$);
}
}
})().call(null,this$,atm);
}
});
crate.binding._compute = (function _compute(this$){if((function (){var and__3547__auto__ = this$;if(and__3547__auto__)
{return this$.crate$binding$computable$_compute$arity$1;
} else
{return and__3547__auto__;
}
})())
{return this$.crate$binding$computable$_compute$arity$1(this$);
} else
{var x__4186__auto__ = (((this$ == null))?null:this$);return (function (){var or__3559__auto__ = (crate.binding._compute[goog.typeOf(x__4186__auto__)]);if(or__3559__auto__)
{return or__3559__auto__;
} else
{var or__3559__auto____$1 = (crate.binding._compute["_"]);if(or__3559__auto____$1)
{return or__3559__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"computable.-compute",this$);
}
}
})().call(null,this$);
}
});

/**
* @constructor
*/
crate.binding.Computed = (function (atms,value,func,watches,key,meta){
this.atms = atms;
this.value = value;
this.func = func;
this.watches = watches;
this.key = key;
this.meta = meta;
this.cljs$lang$protocol_mask$partition0$ = 2153938944;
this.cljs$lang$protocol_mask$partition1$ = 2;
})
crate.binding.Computed.cljs$lang$type = true;
crate.binding.Computed.cljs$lang$ctorStr = "crate.binding/Computed";
crate.binding.Computed.cljs$lang$ctorPrWriter = (function (this__4126__auto__,writer__4127__auto__,opt__4128__auto__){return cljs.core._write.call(null,writer__4127__auto__,"crate.binding/Computed");
});
crate.binding.Computed.prototype.crate$binding$computable$ = true;
crate.binding.Computed.prototype.crate$binding$computable$_depend$arity$2 = (function (this$,atm){var self__ = this;
var this$__$1 = this;this$__$1.atms = cljs.core.conj.call(null,this$__$1.atms,atm);
return cljs.core.add_watch.call(null,atm,self__.key,((function (this$__$1){
return (function (_,___$1,___$2,___$3){return crate.binding._compute.call(null,this$__$1);
});})(this$__$1))
);
});
crate.binding.Computed.prototype.crate$binding$computable$_compute$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var old = this$__$1.value;var nv = cljs.core.apply.call(null,self__.func,cljs.core.map.call(null,cljs.core.deref,self__.atms));this$__$1.value = nv;
return cljs.core._notify_watches.call(null,this$__$1,old,nv);
});
crate.binding.Computed.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return self__.meta;
});
crate.binding.Computed.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return goog.getUid(this$__$1);
});
crate.binding.Computed.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){var self__ = this;
var this$__$1 = this;var seq__5632 = cljs.core.seq.call(null,self__.watches);var chunk__5633 = null;var count__5634 = 0;var i__5635 = 0;while(true){
if((i__5635 < count__5634))
{var vec__5636 = cljs.core._nth.call(null,chunk__5633,i__5635);var key__$1 = cljs.core.nth.call(null,vec__5636,0,null);var f = cljs.core.nth.call(null,vec__5636,1,null);f.call(null,key__$1,this$__$1,oldval,newval);
{
var G__5638 = seq__5632;
var G__5639 = chunk__5633;
var G__5640 = count__5634;
var G__5641 = (i__5635 + 1);
seq__5632 = G__5638;
chunk__5633 = G__5639;
count__5634 = G__5640;
i__5635 = G__5641;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__5632);if(temp__4126__auto__)
{var seq__5632__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5632__$1))
{var c__4315__auto__ = cljs.core.chunk_first.call(null,seq__5632__$1);{
var G__5642 = cljs.core.chunk_rest.call(null,seq__5632__$1);
var G__5643 = c__4315__auto__;
var G__5644 = cljs.core.count.call(null,c__4315__auto__);
var G__5645 = 0;
seq__5632 = G__5642;
chunk__5633 = G__5643;
count__5634 = G__5644;
i__5635 = G__5645;
continue;
}
} else
{var vec__5637 = cljs.core.first.call(null,seq__5632__$1);var key__$1 = cljs.core.nth.call(null,vec__5637,0,null);var f = cljs.core.nth.call(null,vec__5637,1,null);f.call(null,key__$1,this$__$1,oldval,newval);
{
var G__5646 = cljs.core.next.call(null,seq__5632__$1);
var G__5647 = null;
var G__5648 = 0;
var G__5649 = 0;
seq__5632 = G__5646;
chunk__5633 = G__5647;
count__5634 = G__5648;
i__5635 = G__5649;
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
crate.binding.Computed.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key__$1,f){var self__ = this;
var this$__$1 = this;if(cljs.core.truth_(f))
{return this$__$1.watches = cljs.core.assoc.call(null,self__.watches,key__$1,f);
} else
{return null;
}
});
crate.binding.Computed.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key__$1){var self__ = this;
var this$__$1 = this;return this$__$1.watches = cljs.core.dissoc.call(null,self__.watches,key__$1);
});
crate.binding.Computed.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){var self__ = this;
var this$__$1 = this;return cljs.core._write.call(null,writer,("#<Computed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,self__.value))+">"));
});
crate.binding.Computed.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.value;
});
crate.binding.Computed.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){var self__ = this;
var o__$1 = this;return (o__$1 === other);
});
crate.binding.__GT_Computed = (function __GT_Computed(atms,value,func,watches,key,meta){return (new crate.binding.Computed(atms,value,func,watches,key,meta));
});
crate.binding.computed = (function computed(atms,func){var k = cljs.core.gensym.call(null,"computed");var neue = (new crate.binding.Computed(cljs.core.PersistentVector.EMPTY,null,func,null,k,null));crate.binding._compute.call(null,neue);
var seq__5654_5658 = cljs.core.seq.call(null,atms);var chunk__5655_5659 = null;var count__5656_5660 = 0;var i__5657_5661 = 0;while(true){
if((i__5657_5661 < count__5656_5660))
{var atm_5662 = cljs.core._nth.call(null,chunk__5655_5659,i__5657_5661);crate.binding._depend.call(null,neue,atm_5662);
{
var G__5663 = seq__5654_5658;
var G__5664 = chunk__5655_5659;
var G__5665 = count__5656_5660;
var G__5666 = (i__5657_5661 + 1);
seq__5654_5658 = G__5663;
chunk__5655_5659 = G__5664;
count__5656_5660 = G__5665;
i__5657_5661 = G__5666;
continue;
}
} else
{var temp__4126__auto___5667 = cljs.core.seq.call(null,seq__5654_5658);if(temp__4126__auto___5667)
{var seq__5654_5668__$1 = temp__4126__auto___5667;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5654_5668__$1))
{var c__4315__auto___5669 = cljs.core.chunk_first.call(null,seq__5654_5668__$1);{
var G__5670 = cljs.core.chunk_rest.call(null,seq__5654_5668__$1);
var G__5671 = c__4315__auto___5669;
var G__5672 = cljs.core.count.call(null,c__4315__auto___5669);
var G__5673 = 0;
seq__5654_5658 = G__5670;
chunk__5655_5659 = G__5671;
count__5656_5660 = G__5672;
i__5657_5661 = G__5673;
continue;
}
} else
{var atm_5674 = cljs.core.first.call(null,seq__5654_5668__$1);crate.binding._depend.call(null,neue,atm_5674);
{
var G__5675 = cljs.core.next.call(null,seq__5654_5668__$1);
var G__5676 = null;
var G__5677 = 0;
var G__5678 = 0;
seq__5654_5658 = G__5675;
chunk__5655_5659 = G__5676;
count__5656_5660 = G__5677;
i__5657_5661 = G__5678;
continue;
}
}
} else
{}
}
break;
}
return neue;
});
crate.binding.compute = (function compute(compu){return crate.binding._compute.call(null,compu);
});
crate.binding.depend_on = (function depend_on(compu,atm){return crate.binding._depend.call(null,compu,atm);
});
crate.binding.notify = (function notify(w,o,v){return cljs.core._notify_watches.call(null,w,o,v);
});
crate.binding.bindable_coll = (function (){var obj5680 = {};return obj5680;
})();
crate.binding.bindable = (function (){var obj5682 = {};return obj5682;
})();
crate.binding._value = (function _value(this$){if((function (){var and__3547__auto__ = this$;if(and__3547__auto__)
{return this$.crate$binding$bindable$_value$arity$1;
} else
{return and__3547__auto__;
}
})())
{return this$.crate$binding$bindable$_value$arity$1(this$);
} else
{var x__4186__auto__ = (((this$ == null))?null:this$);return (function (){var or__3559__auto__ = (crate.binding._value[goog.typeOf(x__4186__auto__)]);if(or__3559__auto__)
{return or__3559__auto__;
} else
{var or__3559__auto____$1 = (crate.binding._value["_"]);if(or__3559__auto____$1)
{return or__3559__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"bindable.-value",this$);
}
}
})().call(null,this$);
}
});
crate.binding._on_change = (function _on_change(this$,func){if((function (){var and__3547__auto__ = this$;if(and__3547__auto__)
{return this$.crate$binding$bindable$_on_change$arity$2;
} else
{return and__3547__auto__;
}
})())
{return this$.crate$binding$bindable$_on_change$arity$2(this$,func);
} else
{var x__4186__auto__ = (((this$ == null))?null:this$);return (function (){var or__3559__auto__ = (crate.binding._on_change[goog.typeOf(x__4186__auto__)]);if(or__3559__auto__)
{return or__3559__auto__;
} else
{var or__3559__auto____$1 = (crate.binding._on_change["_"]);if(or__3559__auto____$1)
{return or__3559__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"bindable.-on-change",this$);
}
}
})().call(null,this$,func);
}
});

/**
* @constructor
*/
crate.binding.atom_binding = (function (atm,value_func){
this.atm = atm;
this.value_func = value_func;
})
crate.binding.atom_binding.cljs$lang$type = true;
crate.binding.atom_binding.cljs$lang$ctorStr = "crate.binding/atom-binding";
crate.binding.atom_binding.cljs$lang$ctorPrWriter = (function (this__4126__auto__,writer__4127__auto__,opt__4128__auto__){return cljs.core._write.call(null,writer__4127__auto__,"crate.binding/atom-binding");
});
crate.binding.atom_binding.prototype.crate$binding$bindable$ = true;
crate.binding.atom_binding.prototype.crate$binding$bindable$_value$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return self__.value_func.call(null,cljs.core.deref.call(null,self__.atm));
});
crate.binding.atom_binding.prototype.crate$binding$bindable$_on_change$arity$2 = (function (this$,func){var self__ = this;
var this$__$1 = this;return cljs.core.add_watch.call(null,self__.atm,cljs.core.gensym.call(null,"atom-binding"),((function (this$__$1){
return (function (){return func.call(null,crate.binding._value.call(null,this$__$1));
});})(this$__$1))
);
});
crate.binding.__GT_atom_binding = (function __GT_atom_binding(atm,value_func){return (new crate.binding.atom_binding(atm,value_func));
});

/**
* @constructor
*/
crate.binding.notifier = (function (watches){
this.watches = watches;
this.cljs$lang$protocol_mask$partition0$ = 0;
this.cljs$lang$protocol_mask$partition1$ = 2;
})
crate.binding.notifier.cljs$lang$type = true;
crate.binding.notifier.cljs$lang$ctorStr = "crate.binding/notifier";
crate.binding.notifier.cljs$lang$ctorPrWriter = (function (this__4126__auto__,writer__4127__auto__,opt__4128__auto__){return cljs.core._write.call(null,writer__4127__auto__,"crate.binding/notifier");
});
crate.binding.notifier.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){var self__ = this;
var this$__$1 = this;var seq__5683 = cljs.core.seq.call(null,self__.watches);var chunk__5684 = null;var count__5685 = 0;var i__5686 = 0;while(true){
if((i__5686 < count__5685))
{var vec__5687 = cljs.core._nth.call(null,chunk__5684,i__5686);var key = cljs.core.nth.call(null,vec__5687,0,null);var f = cljs.core.nth.call(null,vec__5687,1,null);f.call(null,key,this$__$1,oldval,newval);
{
var G__5689 = seq__5683;
var G__5690 = chunk__5684;
var G__5691 = count__5685;
var G__5692 = (i__5686 + 1);
seq__5683 = G__5689;
chunk__5684 = G__5690;
count__5685 = G__5691;
i__5686 = G__5692;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__5683);if(temp__4126__auto__)
{var seq__5683__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5683__$1))
{var c__4315__auto__ = cljs.core.chunk_first.call(null,seq__5683__$1);{
var G__5693 = cljs.core.chunk_rest.call(null,seq__5683__$1);
var G__5694 = c__4315__auto__;
var G__5695 = cljs.core.count.call(null,c__4315__auto__);
var G__5696 = 0;
seq__5683 = G__5693;
chunk__5684 = G__5694;
count__5685 = G__5695;
i__5686 = G__5696;
continue;
}
} else
{var vec__5688 = cljs.core.first.call(null,seq__5683__$1);var key = cljs.core.nth.call(null,vec__5688,0,null);var f = cljs.core.nth.call(null,vec__5688,1,null);f.call(null,key,this$__$1,oldval,newval);
{
var G__5697 = cljs.core.next.call(null,seq__5683__$1);
var G__5698 = null;
var G__5699 = 0;
var G__5700 = 0;
seq__5683 = G__5697;
chunk__5684 = G__5698;
count__5685 = G__5699;
i__5686 = G__5700;
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
crate.binding.notifier.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){var self__ = this;
var this$__$1 = this;return this$__$1.watches = cljs.core.assoc.call(null,self__.watches,key,f);
});
crate.binding.notifier.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){var self__ = this;
var this$__$1 = this;return this$__$1.watches = cljs.core.dissoc.call(null,self__.watches,key);
});
crate.binding.__GT_notifier = (function __GT_notifier(watches){return (new crate.binding.notifier(watches));
});

/**
* @constructor
*/
crate.binding.bound_collection = (function (atm,notif,opts,stuff){
this.atm = atm;
this.notif = notif;
this.opts = opts;
this.stuff = stuff;
})
crate.binding.bound_collection.cljs$lang$type = true;
crate.binding.bound_collection.cljs$lang$ctorStr = "crate.binding/bound-collection";
crate.binding.bound_collection.cljs$lang$ctorPrWriter = (function (this__4126__auto__,writer__4127__auto__,opt__4128__auto__){return cljs.core._write.call(null,writer__4127__auto__,"crate.binding/bound-collection");
});
crate.binding.bound_collection.prototype.crate$binding$bindable$ = true;
crate.binding.bound_collection.prototype.crate$binding$bindable$_value$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return cljs.core.map.call(null,new cljs.core.Keyword(null,"elem","elem",1017020161),cljs.core.vals.call(null,this$__$1.stuff));
});
crate.binding.bound_collection.prototype.crate$binding$bindable$_on_change$arity$2 = (function (this$,func){var self__ = this;
var this$__$1 = this;return cljs.core.add_watch.call(null,self__.notif,cljs.core.gensym.call(null,"bound-coll"),((function (this$__$1){
return (function (_,___$1,___$2,p__5701){var vec__5702 = p__5701;var event = cljs.core.nth.call(null,vec__5702,0,null);var el = cljs.core.nth.call(null,vec__5702,1,null);var v = cljs.core.nth.call(null,vec__5702,2,null);return func.call(null,event,el,v);
});})(this$__$1))
);
});
crate.binding.bound_collection.prototype.crate$binding$bindable_coll$ = true;
crate.binding.__GT_bound_collection = (function __GT_bound_collection(atm,notif,opts,stuff){return (new crate.binding.bound_collection(atm,notif,opts,stuff));
});
crate.binding.opt = (function opt(bc,k){return bc.opts.call(null,k);
});
crate.binding.bc_add = (function bc_add(bc,path,key){var sa = crate.binding.subatom.call(null,bc.atm,path);var elem = crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"as","as",1013907364)).call(null,sa);bc.stuff = cljs.core.assoc.call(null,bc.stuff,key,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"elem","elem",1017020161),elem,new cljs.core.Keyword(null,"subatom","subatom",3440732931),sa], null));
return crate.binding.notify.call(null,bc.notif,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"add","add",1014000659),elem,cljs.core.deref.call(null,sa)], null));
});
crate.binding.bc_remove = (function bc_remove(bc,key){var notif = bc.notif;var prev = bc.stuff.call(null,key);bc.stuff = cljs.core.dissoc.call(null,bc.stuff,key);
crate.binding.notify.call(null,bc.notif,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"remove","remove",4374260726),new cljs.core.Keyword(null,"elem","elem",1017020161).cljs$core$IFn$_invoke$arity$1(prev),null], null));
return crate.binding.sub_destroy_BANG_.call(null,new cljs.core.Keyword(null,"subatom","subatom",3440732931).cljs$core$IFn$_invoke$arity$1(prev));
});
crate.binding.__GT_indexed = (function __GT_indexed(coll){if(cljs.core.map_QMARK_.call(null,coll))
{return cljs.core.seq.call(null,coll);
} else
{if(cljs.core.set_QMARK_.call(null,coll))
{return cljs.core.map.call(null,cljs.core.juxt.call(null,cljs.core.identity,cljs.core.identity),coll);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.map_indexed.call(null,cljs.core.vector,coll);
} else
{return null;
}
}
}
});
crate.binding.__GT_keyed = (function __GT_keyed(coll,keyfn){return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,keyfn,crate.binding.__GT_indexed.call(null,coll)));
});
/**
* @param {...*} var_args
*/
crate.binding.__GT_path = (function() { 
var __GT_path__delegate = function (bc,segs){return cljs.core.concat.call(null,(function (){var or__3559__auto__ = crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"path","path",1017337751));if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return cljs.core.PersistentVector.EMPTY;
}
})(),segs);
};
var __GT_path = function (bc,var_args){
var segs = null;if (arguments.length > 1) {
  segs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return __GT_path__delegate.call(this,bc,segs);};
__GT_path.cljs$lang$maxFixedArity = 1;
__GT_path.cljs$lang$applyTo = (function (arglist__5703){
var bc = cljs.core.first(arglist__5703);
var segs = cljs.core.rest(arglist__5703);
return __GT_path__delegate(bc,segs);
});
__GT_path.cljs$core$IFn$_invoke$arity$variadic = __GT_path__delegate;
return __GT_path;
})()
;
crate.binding.bc_compare = (function bc_compare(bc,neue){var prev = bc.stuff;var pset = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.keys.call(null,prev));var nset = crate.binding.__GT_keyed.call(null,neue,crate.binding.opt.call(null,bc,new cljs.core.Keyword(null,"keyfn","keyfn",1115849433)));var added = cljs.core.into.call(null,cljs.core.sorted_set.call(null),clojure.set.difference.call(null,nset,pset));var removed = cljs.core.into.call(null,cljs.core.sorted_set.call(null),clojure.set.difference.call(null,pset,nset));var seq__5712_5720 = cljs.core.seq.call(null,added);var chunk__5713_5721 = null;var count__5714_5722 = 0;var i__5715_5723 = 0;while(true){
if((i__5715_5723 < count__5714_5722))
{var a_5724 = cljs.core._nth.call(null,chunk__5713_5721,i__5715_5723);crate.binding.bc_add.call(null,bc,a_5724,a_5724);
{
var G__5725 = seq__5712_5720;
var G__5726 = chunk__5713_5721;
var G__5727 = count__5714_5722;
var G__5728 = (i__5715_5723 + 1);
seq__5712_5720 = G__5725;
chunk__5713_5721 = G__5726;
count__5714_5722 = G__5727;
i__5715_5723 = G__5728;
continue;
}
} else
{var temp__4126__auto___5729 = cljs.core.seq.call(null,seq__5712_5720);if(temp__4126__auto___5729)
{var seq__5712_5730__$1 = temp__4126__auto___5729;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5712_5730__$1))
{var c__4315__auto___5731 = cljs.core.chunk_first.call(null,seq__5712_5730__$1);{
var G__5732 = cljs.core.chunk_rest.call(null,seq__5712_5730__$1);
var G__5733 = c__4315__auto___5731;
var G__5734 = cljs.core.count.call(null,c__4315__auto___5731);
var G__5735 = 0;
seq__5712_5720 = G__5732;
chunk__5713_5721 = G__5733;
count__5714_5722 = G__5734;
i__5715_5723 = G__5735;
continue;
}
} else
{var a_5736 = cljs.core.first.call(null,seq__5712_5730__$1);crate.binding.bc_add.call(null,bc,a_5736,a_5736);
{
var G__5737 = cljs.core.next.call(null,seq__5712_5730__$1);
var G__5738 = null;
var G__5739 = 0;
var G__5740 = 0;
seq__5712_5720 = G__5737;
chunk__5713_5721 = G__5738;
count__5714_5722 = G__5739;
i__5715_5723 = G__5740;
continue;
}
}
} else
{}
}
break;
}
var seq__5716 = cljs.core.seq.call(null,removed);var chunk__5717 = null;var count__5718 = 0;var i__5719 = 0;while(true){
if((i__5719 < count__5718))
{var r = cljs.core._nth.call(null,chunk__5717,i__5719);crate.binding.bc_remove.call(null,bc,r);
{
var G__5741 = seq__5716;
var G__5742 = chunk__5717;
var G__5743 = count__5718;
var G__5744 = (i__5719 + 1);
seq__5716 = G__5741;
chunk__5717 = G__5742;
count__5718 = G__5743;
i__5719 = G__5744;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__5716);if(temp__4126__auto__)
{var seq__5716__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__5716__$1))
{var c__4315__auto__ = cljs.core.chunk_first.call(null,seq__5716__$1);{
var G__5745 = cljs.core.chunk_rest.call(null,seq__5716__$1);
var G__5746 = c__4315__auto__;
var G__5747 = cljs.core.count.call(null,c__4315__auto__);
var G__5748 = 0;
seq__5716 = G__5745;
chunk__5717 = G__5746;
count__5718 = G__5747;
i__5719 = G__5748;
continue;
}
} else
{var r = cljs.core.first.call(null,seq__5716__$1);crate.binding.bc_remove.call(null,bc,r);
{
var G__5749 = cljs.core.next.call(null,seq__5716__$1);
var G__5750 = null;
var G__5751 = 0;
var G__5752 = 0;
seq__5716 = G__5749;
chunk__5717 = G__5750;
count__5718 = G__5751;
i__5719 = G__5752;
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
/**
* @param {...*} var_args
*/
crate.binding.bound_coll = (function() { 
var bound_coll__delegate = function (atm,p__5753){var vec__5756 = p__5753;var path = cljs.core.nth.call(null,vec__5756,0,null);var opts = cljs.core.nth.call(null,vec__5756,1,null);var vec__5757 = (cljs.core.truth_(opts)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path,opts], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,path], null));var path__$1 = cljs.core.nth.call(null,vec__5757,0,null);var opts__$1 = cljs.core.nth.call(null,vec__5757,1,null);var atm__$1 = ((cljs.core.not.call(null,path__$1))?atm:crate.binding.subatom.call(null,atm,path__$1));var opts__$2 = cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"path","path",1017337751),path__$1);var opts__$3 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",1115849433).cljs$core$IFn$_invoke$arity$1(opts__$2)))?cljs.core.assoc.call(null,opts__$2,new cljs.core.Keyword(null,"keyfn","keyfn",1115849433),cljs.core.first):cljs.core.assoc.call(null,opts__$2,new cljs.core.Keyword(null,"keyfn","keyfn",1115849433),cljs.core.comp.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",1115849433).cljs$core$IFn$_invoke$arity$1(opts__$2),cljs.core.second)));var bc = (new crate.binding.bound_collection(atm__$1,(new crate.binding.notifier(null)),opts__$3,cljs.core.sorted_map.call(null)));cljs.core.add_watch.call(null,atm__$1,cljs.core.gensym.call(null,"bound-coll"),((function (vec__5757,path__$1,opts__$1,atm__$1,opts__$2,opts__$3,bc,vec__5756,path,opts){
return (function (_,___$1,___$2,neue){return crate.binding.bc_compare.call(null,bc,neue);
});})(vec__5757,path__$1,opts__$1,atm__$1,opts__$2,opts__$3,bc,vec__5756,path,opts))
);
crate.binding.bc_compare.call(null,bc,cljs.core.deref.call(null,atm__$1));
return bc;
};
var bound_coll = function (atm,var_args){
var p__5753 = null;if (arguments.length > 1) {
  p__5753 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return bound_coll__delegate.call(this,atm,p__5753);};
bound_coll.cljs$lang$maxFixedArity = 1;
bound_coll.cljs$lang$applyTo = (function (arglist__5758){
var atm = cljs.core.first(arglist__5758);
var p__5753 = cljs.core.rest(arglist__5758);
return bound_coll__delegate(atm,p__5753);
});
bound_coll.cljs$core$IFn$_invoke$arity$variadic = bound_coll__delegate;
return bound_coll;
})()
;
/**
* @param {...*} var_args
*/
crate.binding.map_bound = (function() { 
var map_bound__delegate = function (as,atm,p__5759){var vec__5761 = p__5759;var opts = cljs.core.nth.call(null,vec__5761,0,null);var opts__$1 = cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"as","as",1013907364),as);var atm__$1 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(opts__$1)))?atm:crate.binding.subatom.call(null,atm,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(opts__$1)));var opts__$2 = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",1115849433).cljs$core$IFn$_invoke$arity$1(opts__$1)))?cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"keyfn","keyfn",1115849433),cljs.core.first):cljs.core.assoc.call(null,opts__$1,new cljs.core.Keyword(null,"keyfn","keyfn",1115849433),cljs.core.comp.call(null,new cljs.core.Keyword(null,"keyfn","keyfn",1115849433).cljs$core$IFn$_invoke$arity$1(opts__$1),cljs.core.second)));var bc = (new crate.binding.bound_collection(atm__$1,(new crate.binding.notifier(null)),opts__$2,cljs.core.sorted_map.call(null)));cljs.core.add_watch.call(null,atm__$1,cljs.core.gensym.call(null,"bound-coll"),((function (opts__$1,atm__$1,opts__$2,bc,vec__5761,opts){
return (function (_,___$1,___$2,neue){return crate.binding.bc_compare.call(null,bc,neue);
});})(opts__$1,atm__$1,opts__$2,bc,vec__5761,opts))
);
crate.binding.bc_compare.call(null,bc,cljs.core.deref.call(null,atm__$1));
return bc;
};
var map_bound = function (as,atm,var_args){
var p__5759 = null;if (arguments.length > 2) {
  p__5759 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return map_bound__delegate.call(this,as,atm,p__5759);};
map_bound.cljs$lang$maxFixedArity = 2;
map_bound.cljs$lang$applyTo = (function (arglist__5762){
var as = cljs.core.first(arglist__5762);
arglist__5762 = cljs.core.next(arglist__5762);
var atm = cljs.core.first(arglist__5762);
var p__5759 = cljs.core.rest(arglist__5762);
return map_bound__delegate(as,atm,p__5759);
});
map_bound.cljs$core$IFn$_invoke$arity$variadic = map_bound__delegate;
return map_bound;
})()
;
crate.binding.binding_QMARK_ = (function binding_QMARK_(b){var G__5764 = b;if(G__5764)
{var bit__4209__auto__ = null;if(cljs.core.truth_((function (){var or__3559__auto__ = bit__4209__auto__;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return G__5764.crate$binding$bindable$;
}
})()))
{return true;
} else
{if((!G__5764.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,crate.binding.bindable,G__5764);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,crate.binding.bindable,G__5764);
}
});
crate.binding.binding_coll_QMARK_ = (function binding_coll_QMARK_(b){var G__5766 = b;if(G__5766)
{var bit__4209__auto__ = null;if(cljs.core.truth_((function (){var or__3559__auto__ = bit__4209__auto__;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return G__5766.crate$binding$bindable_coll$;
}
})()))
{return true;
} else
{if((!G__5766.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,crate.binding.bindable_coll,G__5766);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,crate.binding.bindable_coll,G__5766);
}
});
crate.binding.deref_QMARK_ = (function deref_QMARK_(atm){var G__5768 = atm;if(G__5768)
{var bit__4209__auto__ = (G__5768.cljs$lang$protocol_mask$partition0$ & 32768);if((bit__4209__auto__) || (G__5768.cljs$core$IDeref$))
{return true;
} else
{if((!G__5768.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,G__5768);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,G__5768);
}
});
crate.binding.value = (function value(b){return crate.binding._value.call(null,b);
});
crate.binding.index = (function index(sub_atom){return cljs.core.last.call(null,sub_atom.path);
});
crate.binding.on_change = (function on_change(b,func){return crate.binding._on_change.call(null,b,func);
});
/**
* @param {...*} var_args
*/
crate.binding.bound = (function() { 
var bound__delegate = function (atm,p__5769){var vec__5771 = p__5769;var func = cljs.core.nth.call(null,vec__5771,0,null);var func__$1 = (function (){var or__3559__auto__ = func;if(cljs.core.truth_(or__3559__auto__))
{return or__3559__auto__;
} else
{return cljs.core.identity;
}
})();return (new crate.binding.atom_binding(atm,func__$1));
};
var bound = function (atm,var_args){
var p__5769 = null;if (arguments.length > 1) {
  p__5769 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return bound__delegate.call(this,atm,p__5769);};
bound.cljs$lang$maxFixedArity = 1;
bound.cljs$lang$applyTo = (function (arglist__5772){
var atm = cljs.core.first(arglist__5772);
var p__5769 = cljs.core.rest(arglist__5772);
return bound__delegate(atm,p__5769);
});
bound.cljs$core$IFn$_invoke$arity$variadic = bound__delegate;
return bound;
})()
;
