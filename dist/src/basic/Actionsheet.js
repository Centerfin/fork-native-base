Object.defineProperty(exports,"__esModule",{value:true});exports.ActionSheetContainer=undefined;var _jsxFileName='src/basic/Actionsheet.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _deprecatedReactNativePropTypes=require('deprecated-react-native-prop-types');var _reactNative=require('react-native');var _nativeBaseShoutemTheme=require('native-base-shoutem-theme');var _mapPropsToStyleNames=require('../utils/mapPropsToStyleNames');var _mapPropsToStyleNames2=_interopRequireDefault(_mapPropsToStyleNames);var _commonColor=require('../theme/variables/commonColor');var _commonColor2=_interopRequireDefault(_commonColor);var _Text=require('./Text');var _Icon=require('./Icon');var _Left=require('./Left');var _Right=require('./Right');var _Body=require('./Body');var _ListItem=require('./ListItem');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var ActionSheetContainer=function(_Component){_inherits(ActionSheetContainer,_Component);_createClass(ActionSheetContainer,null,[{key:'show',value:function show(config,callback){this.actionsheetInstance._root.showActionSheet(config,callback);}},{key:'hide',value:function hide(){this.actionsheetInstance._root.hideActionSheet();}}]);function ActionSheetContainer(props){_classCallCheck(this,ActionSheetContainer);var _this=_possibleConstructorReturn(this,(ActionSheetContainer.__proto__||Object.getPrototypeOf(ActionSheetContainer)).call(this,props));_this.state={modalVisible:false,items:[]};return _this;}_createClass(ActionSheetContainer,[{key:'componentDidMount',value:function componentDidMount(){if(!this.props.autoHide&&this.props.duration){console.warn('It\'s not recommended to set autoHide false with duration');}}},{key:'showActionSheet',value:function showActionSheet(config,callback){if(_reactNative.Platform.OS===_commonColor.PLATFORM.IOS){if(typeof config.options[0]==='object'){var options=config.options;var filtered=options.map(function(item){return item.text;});var filteredConfig=_extends({},config,{options:filtered});_reactNative.ActionSheetIOS.showActionSheetWithOptions(filteredConfig,callback);}else{_reactNative.ActionSheetIOS.showActionSheetWithOptions(config,callback);}}else{this.setState({items:config.options,title:config.title,message:config.message,destructiveButtonIndex:config.destructiveButtonIndex,cancelButtonIndex:config.cancelButtonIndex,modalVisible:true,callback:callback,style:config.style,fontStyle:config.fontStyle});}}},{key:'hideActionSheet',value:function hideActionSheet(){this.setState({modalVisible:false});}},{key:'render',value:function render(){var _this2=this;return _react2.default.createElement(_reactNative.Modal,{animationType:'fade',transparent:true,visible:this.state.modalVisible,onRequestClose:function onRequestClose(){_this2.state.callback(_this2.state.cancelButtonIndex);_this2.setState({modalVisible:false});},__source:{fileName:_jsxFileName,lineNumber:86}},_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:1,onPress:function onPress(){_this2.state.callback(_this2.state.cancelButtonIndex);_this2.setState({modalVisible:false});},style:styles.containerTouchable,__source:{fileName:_jsxFileName,lineNumber:95}},_react2.default.createElement(_reactNative.TouchableOpacity,{activeOpacity:1,style:[styles.innerTouchable,this.state.style],__source:{fileName:_jsxFileName,lineNumber:103}},this.state.title?_react2.default.createElement(_Text.Text,{style:styles.touchableText,__source:{fileName:_jsxFileName,lineNumber:108}},this.state.title):null,_react2.default.createElement(_reactNative.FlatList,{style:[styles.flatList,{marginTop:this.state.title?_commonColor2.default.marginTop:0}],data:this.state.items,keyExtractor:function keyExtractor(item,index){return String(index);},renderItem:function renderItem(_ref){var index=_ref.index,item=_ref.item;return typeof _this2.state.items[0]==='string'?_react2.default.createElement(_ListItem.ListItem,{onPress:function onPress(){_this2.state.callback(parseInt(index));_this2.setState({modalVisible:false});},style:styles.listItem,__source:{fileName:_jsxFileName,lineNumber:119}},_react2.default.createElement(_Text.Text,{style:_this2.state.fontStyle,__source:{fileName:_jsxFileName,lineNumber:126}},item)):_react2.default.createElement(_ListItem.ListItem,{onPress:function onPress(){_this2.state.callback(parseInt(index));_this2.setState({modalVisible:false});},style:[styles.listItem,{height:_commonColor2.default.listItemHeight}],icon:true,__source:{fileName:_jsxFileName,lineNumber:129}},_react2.default.createElement(_Left.Left,{__source:{fileName:_jsxFileName,lineNumber:142}},_react2.default.createElement(_Icon.Icon,{name:item.icon,type:item.iconType,style:{color:item.iconColor?item.iconColor:undefined},__source:{fileName:_jsxFileName,lineNumber:143}})),_react2.default.createElement(_Body.Body,{style:styles.listItemBody,__source:{fileName:_jsxFileName,lineNumber:151}},_react2.default.createElement(_Text.Text,{style:_this2.state.fontStyle,__source:{fileName:_jsxFileName,lineNumber:152}},item.text)),_react2.default.createElement(_Right.Right,{__source:{fileName:_jsxFileName,lineNumber:154}}));},__source:{fileName:_jsxFileName,lineNumber:110}}))));}}]);return ActionSheetContainer;}(_react.Component);ActionSheetContainer.propTypes=_extends({},_deprecatedReactNativePropTypes.ViewPropTypes);var styles=_reactNative.StyleSheet.create({containerTouchable:{backgroundColor:_commonColor2.default.containerTouchableBackgroundColor,flex:1,justifyContent:'flex-end'},flatList:{marginHorizontal:_commonColor2.default.marginHorizontal},innerTouchable:{backgroundColor:_commonColor2.default.innerTouchableBackgroundColor,minHeight:_commonColor2.default.minHeight,maxHeight:_reactNative.Dimensions.get('window').height/2,padding:_commonColor2.default.padding,elevation:_commonColor2.default.elevation},listItem:{borderColor:_commonColor2.default.listItemBorderColor,marginLeft:_commonColor2.default.marginLeft},listItemBody:{borderColor:_commonColor2.default.listItemBorderColor,paddingLeft:_commonColor2.default.marginLeft/2},touchableText:{color:_commonColor2.default.touchableTextColor}});var StyledActionSheetContainer=(0,_nativeBaseShoutemTheme.connectStyle)('NativeBase.ActionSheetContainer',{},_mapPropsToStyleNames2.default)(ActionSheetContainer);exports.ActionSheetContainer=StyledActionSheetContainer;
//# sourceMappingURL=Actionsheet.js.map