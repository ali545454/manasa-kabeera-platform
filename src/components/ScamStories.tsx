import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, PlayCircle } from 'lucide-react';

const scamStories = [
	{
		name: 'محمد من أسيوط',
		story: 'تعرضت للنصب في شقة وهمية ودفعوني مقدم ولم أجد الشقة عند الوصول. الموقع ساعدني أسترد جزء من المبلغ.',
	},
	{
		name: 'فاطمة من القاهرة',
		story: 'استأجرت شقة من إعلان مزيف وخسرت أموالي. تعلمت أهمية التحقق من الشقق عبر الموقع.',
	},
];

const ScamStories = () => (
	<section className="container py-16">
		<h2 className="text-3xl font-bold text-center mb-8 text-primary flex items-center justify-center gap-2">
			<AlertTriangle className="inline-block text-red-500" size={32} />
			قصص نصب وتجارب حقيقية
		</h2>
		<div className="grid md:grid-cols-2 gap-8">
			{scamStories.map((story, idx) => (
				<Card key={idx} className="border-red-200 bg-red-50">
					<CardContent className="py-6">
						<div className="flex items-center gap-2 mb-2">
							<AlertTriangle className="text-red-400" size={20} />
							<h4 className="font-semibold">{story.name}</h4>
						</div>
						<p className="text-muted-foreground">{story.story}</p>
					</CardContent>
				</Card>
			))}
		</div>
		{/* عارض فيديو منسق */}
		<div className="flex justify-center mt-10">
			<div className="relative w-full max-w-xl rounded-lg overflow-hidden shadow-lg bg-black">
				<video
					controls
					poster="/video-poster.jpg"
					className="w-full h-64 object-cover rounded-lg border-4 border-primary"
				>
					<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
					المتصفح لا يدعم عرض الفيديو.
				</video>
				<div className="absolute left-4 bottom-4 flex items-center gap-2 bg-primary/80 px-4 py-2 rounded-full text-white shadow-lg">
					<PlayCircle className="text-white" size={24} />
					<span>شاهد تجربة طالب فعلي</span>
				</div>
			</div>
		</div>
	</section>
);

export default ScamStories;