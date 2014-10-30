// Compiled by ClojureScript 0.0-2234
goog.provide('client');
goog.require('cljs.core');
goog.require('dommy.core');
goog.require('dommy.core');
goog.require('crate.core');
goog.require('crate.core');
/**
* Return all teammate tiles.
*/
client.get_tiles = (function get_tiles(){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["img/1.jpg","img/2.jpg"], null);
});
/**
* 
*/
client.build_content = (function build_content(){var imgs = cljs.core.map.call(null,(function (tile){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li.mate","li.mate",1131940936),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1014008629),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",1014018390),tile], null)], null)], null);
}),client.get_tiles.call(null));return crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.mates","ul.mates",1546009449),imgs], null));
});
/**
* Return a title DOM element.
*/
client.build_title = (function build_title(){return crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1.title","h1.title",3842872421),"Teamwall"], null));
});
/**
* Main rendering function.
*/
client.build = (function build(){var body = document.body;return dommy.core.append_BANG_.call(null,body,client.build_title.call(null),client.build_content.call(null));
});
client.build.call(null);
