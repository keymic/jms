<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $pearsonRepository = $em->getRepository('AppBundle:Pearson');
        $pearsons = $pearsonRepository->findAll();

        $januszRepository = $em->getRepository('AppBundle:Janusz');
        $januszes = $januszRepository->findAll();

        $ret = [];
        foreach ($pearsons as $pkey => $pearson) {
            $ret[$pkey]['name'] = $pearson->getName();
            $ret[$pkey]['surname'] = $pearson->getSurname();
            $ret[$pkey]['janusze']['count'] = 0;
            foreach ($januszes as $janusz) {
                if ($janusz->getPearson() == $pearson) {
                    $ret[$pkey]['janusze']['count']++;
                    $ret[$pkey]['janusze'][] = ['reason' => $janusz->getReason(), 'date' => $janusz->getDate()];
                }
            }
        }
        dump(json_encode($ret));
        exit;
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..') . DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/addjanusz", name="addjanusz")
     */
    public function addJanuszAction(Request $request)
    {

    }

    /**
     * @Route("/addpearson", name="addpearson")
     */
    public function addPearsonAction(Request $request)
    {

    }
}
