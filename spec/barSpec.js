describe("As a guest i want to order a drink from the barkeeper", function() {
	describe("The barkeeper", function(){
		it("should return an ordered wodka lemon", function() {
			var order = new Order();
			order.add(menu.wodkaLemon);
			// oops, nur ein Mock
			spyOn(barkeeper, "accept").andReturn([new WodkaLemon()]);
			var drinks = barkeeper.accept(order);
			expect(drinks).toContain(new WodkaLemon());
		});
	});
});

