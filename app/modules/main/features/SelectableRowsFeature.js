(function(){
    'use strict';

    function SelectableRowsFeatureFactory($timeout){

        function SelectableRowsFeature(params){
            this.$scope = params.$scope;
            this.ctrl = params.ctrl;

            this.$scope.onCheckboxChange = _.bind(this.onCheckboxChange, this);
            this.$scope.toggleSelectableRows = _.bind(this.toggleSelectableRows, this);
            this.$scope.isSelectableRowsEnabled = _.bind(this.isSelectableRowsEnabled, this);
        }

        SelectableRowsFeature.prototype.onCheckboxChange = function(){
            var that = this;
            // we need to push it to the event loop to make it happen last
            // (e.g.: all the elements can be selected before we call the callback)
            $timeout(function(){
                that.$scope.selectedRowCallback({
                    rows: that.ctrl.dataStorage.getSelectedRows()
                });
            },0);
        };

        SelectableRowsFeature.prototype.toggleSelectableRows = function() {
            var that = this;

            if(that.selectableRowsEnabled) {
                that.ctrl.dataStorage.setAllRowsSelected(false);
                that.selectableRowsEnabled = false;
            } else {
                that.selectableRowsEnabled = true;
            }
        }

        SelectableRowsFeature.prototype.isSelectableRowsEnabled = function() {
            var that = this;

            return that.selectableRowsEnabled;
        }

        return {
            getInstance: function(params){
                return new SelectableRowsFeature(params);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('SelectableRowsFeature', SelectableRowsFeatureFactory);
}());
