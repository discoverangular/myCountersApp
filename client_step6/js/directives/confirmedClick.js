app.directive('confirmedClick', function($parse, $compile, $rootScope) {
	var dialog = [
,'<style>.dialog_overlay {position:absolute;z-index:9999;top:0;left:0;width:100%;height:100%;background-color:#000;opacity: 0.7;} '
,'.dialog_container{background-color: #FFF;z-index:10000;position: absolute;width: 90%;top: 50%;left: 50%;'
,'transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);'
,'-moz-box-shadow: 0 17px 50px 0 rgba(0,0,0,.19);-webkit-box-shadow: 0 17px 50px 0 rgba(0,0,0,.19);box-shadow: 0 17px 50px 0 rgba(0,0,0,.19);}'
,'.dialog_message{padding-top: 10px;padding-bottom: 10px;padding-left: 5px;padding-right: 5px;color: #666;font-size: 1.2em;text-align: center;}'
,'.dialog_actions{border-top: 1px solid #AFE7FF;}'
,'.dialog_actions a {float: left;height: 48px;width: 50%;font-size: 1.2em;color: #01B9FF;text-align: center;line-height: 48px;border-right: 1px solid #AFE7FF;}'
,'.dialog_actions a:active{background-color: #F5F5F5;}'
,'.dialog_actions  a:last-child{border-right: none;} </style>'

,'<div class="dialog_overlay"></div><div class="dialog_container">'
,'<div class="dialog_message">Do you want to delete this item forever ?</div>'
,'<div class="dialog_actions clearfix">'
,'<a ng-click="close(true)">Delete</a>'
,'<a ng-click="close()">Cancel</a>'
,'</div></div>'
].join("");

	return {
		link: function(scope, element, attrs) {
			element.on('click', function() {
				var dialogScope = $rootScope.$new();
				var dialogElement = $compile(dialog)(scope);
				element.attr('disabled', 'disabled');
				angular.element(document).find('body').prepend(dialogElement);
				
				scope.close = function(execute) {
					element.removeAttr('disabled');
					dialogElement.remove();
					var fn = $parse(attrs.confirmedClick);
					if(execute){
						fn(scope);
					}
				};
			});
		}
	};
});