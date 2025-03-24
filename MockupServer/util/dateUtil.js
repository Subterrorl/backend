dateUtil = {
  convertTraffixDate: function (trafficDate) {
    return trafficDate.slice(0,4) + "-" + trafficDate.slice(4,6) + "-" + trafficDate.slice(6);
  }
}

module.exports = dateUtil;